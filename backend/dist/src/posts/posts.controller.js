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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_js_1 = require("./posts.service.js");
const storage_service_js_1 = require("../storage/storage.service.js");
const jwt_auth_guard_js_1 = require("../auth/jwt-auth.guard.js");
const get_user_decorator_js_1 = require("../auth/decorators/get-user.decorator.js");
const create_post_dto_js_1 = require("./dto/create-post.dto.js");
let PostsController = class PostsController {
    postsService;
    storageService;
    constructor(postsService, storageService) {
        this.postsService = postsService;
        this.storageService = storageService;
    }
    async getPresignedUrl(fileType) {
        return this.storageService.getPresignedUrl(fileType || 'image/jpeg');
    }
    async create(user, createPostDto) {
        return this.postsService.create(user.userId, createPostDto);
    }
    async findOne(id) {
        return this.postsService.findOne(id);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)('presigned-url'),
    __param(0, (0, common_1.Query)('fileType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPresignedUrl", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, get_user_decorator_js_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_post_dto_js_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findOne", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    __metadata("design:paramtypes", [posts_service_js_1.PostsService,
        storage_service_js_1.StorageService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map