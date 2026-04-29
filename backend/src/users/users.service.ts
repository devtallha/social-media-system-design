import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(registerUserDto: RegisterUserDto) {
    const { email, username, password } = registerUserDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });
  }

  async follow(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new ConflictException('You cannot follow yourself');
    }

    const followingUser = await this.prisma.user.findUnique({
      where: { id: followingId },
    });

    if (!followingUser) {
      throw new ConflictException('User to follow not found');
    }

    return this.prisma.follows.upsert({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
      update: {},
      create: {
        followerId,
        followingId,
      },
    });
  }

  async unfollow(followerId: string, followingId: string) {
    return this.prisma.follows.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });
  }
}
