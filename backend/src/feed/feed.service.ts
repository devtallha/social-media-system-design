import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Redis from 'ioredis';

@Injectable()
export class FeedService {
  private redis: Redis;

  constructor(private prisma: PrismaService) {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6380,
    });
  }

  async handlePostCreated(data: { postId: string; userId: string }) {
    const { postId, userId } = data;
    const BATCH_SIZE = 1000;
    let skip = 0;

    while (true) {
      // Fetch followers in batches to prevent memory overflow
      const followers = await this.prisma.follows.findMany({
        where: { followingId: userId },
        select: { followerId: true },
        take: BATCH_SIZE,
        skip: skip,
      });

      if (followers.length === 0) break;

      const pipeline = this.redis.pipeline();
      followers.forEach((follower: any) => {
        const key = `feed:${follower.followerId}`;
        pipeline.lpush(key, postId);
        pipeline.ltrim(key, 0, 999); // Keep only the latest 1000 posts
      });

      await pipeline.exec();
      skip += BATCH_SIZE;
    }
  }

  async getFeed(userId: string, limit = 20, offset = 0) {
    const key = `feed:${userId}`;
    
    // 1. Get post IDs from Redis
    const postIds = await this.redis.lrange(key, offset, offset + limit - 1);

    if (postIds.length === 0) {
      // Fallback: If Redis is empty, fetch from DB (for new/inactive users)
      return this.prisma.post.findMany({
        where: {
          user: {
            followers: {
              some: { followerId: userId }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        include: {
          user: {
            select: { id: true, username: true }
          },
          _count: {
            select: { likes: true }
          }
        }
      });
    }

    // 2. Fetch post details from Postgres using the IDs from Redis
    const posts = await this.prisma.post.findMany({
      where: { id: { in: postIds } },
      include: {
        user: {
          select: { id: true, username: true }
        },
        _count: {
          select: { likes: true }
        }
      }
    });

    // Optimized sorting: O(N) using a Map
    const postMap = new Map(posts.map((post: any) => [post.id, post]));
    return postIds.map((id: string) => postMap.get(id)).filter(Boolean);
  }
}
