import { PostsService } from './posts.service.js';
import { StorageService } from '../storage/storage.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
export declare class PostsController {
    private postsService;
    private storageService;
    constructor(postsService: PostsService, storageService: StorageService);
    getPresignedUrl(fileType: string): Promise<{
        uploadUrl: string;
        key: string;
        imageUrl: string;
    }>;
    create(user: any, createPostDto: CreatePostDto): Promise<{
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
}
