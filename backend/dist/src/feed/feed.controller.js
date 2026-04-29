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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedController = void 0;
const common_1 = require("@nestjs/common");
const feed_service_js_1 = require("./feed.service.js");
const jwt_auth_guard_js_1 = require("../auth/jwt-auth.guard.js");
const get_user_decorator_js_1 = require("../auth/decorators/get-user.decorator.js");
const microservices_1 = require("@nestjs/microservices");
let FeedController = class FeedController {
    feedService;
    constructor(feedService) {
        this.feedService = feedService;
    }
    async getFeed(user, limit, offset) {
        return this.feedService.getFeed(user.userId, limit ? Number(limit) : 20, offset ? Number(offset) : 0);
    }
    async handlePostCreated(data) {
        await this.feedService.handlePostCreated(data);
    }
};
exports.FeedController = FeedController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_js_1.GetUser)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getFeed", null);
__decorate([
    (0, microservices_1.EventPattern)('post.created'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "handlePostCreated", null);
exports.FeedController = FeedController = __decorate([
    (0, common_1.Controller)('feed'),
    __metadata("design:paramtypes", [feed_service_js_1.FeedService])
], FeedController);
//# sourceMappingURL=feed.controller.js.map