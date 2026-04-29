import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    @Inject('POST_SERVICE') private client: ClientProxy,
  ) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        userId,
        imageUrl: createPostDto.imageUrl,
        caption: createPostDto.caption,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    // Send event to RabbitMQ for feed fan-out
    this.client.emit('post.created', {
      postId: post.id,
      userId: post.userId,
    });
    
    return post;
  }

  async findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
