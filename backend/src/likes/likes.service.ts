import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async like(userId: string, postId: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    return this.prisma.like.upsert({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      update: {},
      create: {
        userId,
        postId,
      },
    });
  }

  async unlike(userId: string, postId: string) {
    return this.prisma.like.deleteMany({
      where: {
        userId,
        postId,
      },
    });
  }

  async getLikesCount(postId: string) {
    return this.prisma.like.count({
      where: { postId },
    });
  }
}
