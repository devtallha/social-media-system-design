import { PrismaService } from '../prisma/prisma.service.js';
export declare class LikesService {
    private prisma;
    constructor(prisma: PrismaService);
    like(userId: string, postId: string): Promise<{
        createdAt: Date;
        userId: string;
        postId: string;
    }>;
    unlike(userId: string, postId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    getLikesCount(postId: string): Promise<number>;
}
