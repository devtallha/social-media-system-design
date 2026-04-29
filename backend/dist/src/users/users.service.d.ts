import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(registerUserDto: RegisterUserDto): Promise<{
        email: string;
        username: string;
        id: string;
        createdAt: Date;
    }>;
    findByUsername(username: string): Promise<{
        email: string;
        username: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): Promise<{
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
    follow(followerId: string, followingId: string): Promise<{
        createdAt: Date;
        followerId: string;
        followingId: string;
    }>;
    unfollow(followerId: string, followingId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
