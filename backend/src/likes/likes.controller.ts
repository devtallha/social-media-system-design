import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { GetUser } from '../auth/decorators/get-user.decorator.js';

@Controller('posts/:postId')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post('like')
  async like(@Param('postId') postId: string, @GetUser() user: any) {
    return this.likesService.like(user.userId, postId);
  }

  @Delete('unlike')
  async unlike(@Param('postId') postId: string, @GetUser() user: any) {
    return this.likesService.unlike(user.userId, postId);
  }
}
