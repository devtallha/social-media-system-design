import { PrismaService } from '../prisma/prisma.service';
export declare class FeedService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService);
    handlePostCreated(data: {
        postId: string;
        userId: string;
    }): Promise<void>;
    getFeed(userId: string, limit?: number, offset?: number): Promise<any[]>;
}
