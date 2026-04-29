"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ioredis_1 = __importDefault(require("ioredis"));
let FeedService = class FeedService {
    prisma;
    redis;
    constructor(prisma) {
        this.prisma = prisma;
        this.redis = new ioredis_1.default({
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6380,
        });
    }
    async handlePostCreated(data) {
        const { postId, userId } = data;
        const BATCH_SIZE = 1000;
        let skip = 0;
        while (true) {
            const followers = await this.prisma.follows.findMany({
                where: { followingId: userId },
                select: { followerId: true },
                take: BATCH_SIZE,
                skip: skip,
            });
            if (followers.length === 0)
                break;
            const pipeline = this.redis.pipeline();
            followers.forEach((follower) => {
                const key = `feed:${follower.followerId}`;
                pipeline.lpush(key, postId);
                pipeline.ltrim(key, 0, 999);
            });
            await pipeline.exec();
            skip += BATCH_SIZE;
        }
    }
    async getFeed(userId, limit = 20, offset = 0) {
        const key = `feed:${userId}`;
        const postIds = await this.redis.lrange(key, offset, offset + limit - 1);
        if (postIds.length === 0) {
            return this.prisma.post.findMany({
                where: {
                    user: {
                        followers: {
                            some: { followerId: userId }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                take: limit,
                include: {
                    user: {
                        select: { id: true, username: true }
                    },
                    _count: {
                        select: { likes: true }
                    }
                }
            });
        }
        const posts = await this.prisma.post.findMany({
            where: { id: { in: postIds } },
            include: {
                user: {
                    select: { id: true, username: true }
                },
                _count: {
                    select: { likes: true }
                }
            }
        });
        const postMap = new Map(posts.map((post) => [post.id, post]));
        return postIds.map((id) => postMap.get(id)).filter(Boolean);
    }
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeedService);
//# sourceMappingURL=feed.service.js.map