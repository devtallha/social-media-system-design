import { LikesService } from './likes.service.js';
export declare class LikesController {
    private likesService;
    constructor(likesService: LikesService);
    like(postId: string, user: any): Promise<{
        createdAt: Date;
        userId: string;
        postId: string;
    }>;
    unlike(postId: string, user: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
