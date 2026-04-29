import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { GetUser } from '../auth/decorators/get-user.decorator.js';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFeed(
    @GetUser() user: any,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.feedService.getFeed(
      user.userId,
      limit ? Number(limit) : 20,
      offset ? Number(offset) : 0,
    );
  }

  @EventPattern('post.created')
  async handlePostCreated(@Payload() data: { postId: string; userId: string }) {
    await this.feedService.handlePostCreated(data);
  }
}
