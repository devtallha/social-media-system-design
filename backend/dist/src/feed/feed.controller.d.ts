import { FeedService } from './feed.service.js';
export declare class FeedController {
    private feedService;
    constructor(feedService: FeedService);
    getFeed(user: any, limit: number, offset: number): Promise<any[]>;
    handlePostCreated(data: {
        postId: string;
        userId: string;
    }): Promise<void>;
}
