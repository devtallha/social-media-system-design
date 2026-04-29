import { UsersService } from './users.service.js';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(id: string): Promise<{
        email: string;
        username: string;
        id: string;
        createdAt: Date;
        _count: {
            posts: number;
            followers: number;
            following: number;
        };
    } | null>;
    follow(id: string, user: any): Promise<{
        createdAt: Date;
        followerId: string;
        followingId: string;
    }>;
    unfollow(id: string, user: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
