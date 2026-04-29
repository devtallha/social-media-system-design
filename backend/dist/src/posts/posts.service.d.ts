import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class PostsService {
    private prisma;
    private client;
    constructor(prisma: PrismaService, client: ClientProxy);
    create(userId: string, createPostDto: CreatePostDto): Promise<{
        user: {
            username: string;
            id: string;
        };
        _count: {
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        caption: string | null;
        userId: string;
    }>;
    findOne(id: string): Promise<({
        user: {
            username: string;
            id: string;
        };
        _count: {
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        caption: string | null;
        userId: string;
    }) | null>;
    findByUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        caption: string | null;
        userId: string;
    }[]>;
}
