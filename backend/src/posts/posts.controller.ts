import { Controller, Post, Get, Body, Query, Param, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { StorageService } from '../storage/storage.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { GetUser } from '../auth/decorators/get-user.decorator.js';
import { CreatePostDto } from './dto/create-post.dto.js';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(
    private postsService: PostsService,
    private storageService: StorageService,
  ) {}

  @Get('presigned-url')
  async getPresignedUrl(@Query('fileType') fileType: string) {
    return this.storageService.getPresignedUrl(fileType || 'image/jpeg');
  }

  @Post()
  async create(@GetUser() user: any, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(user.userId, createPostDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }
}
