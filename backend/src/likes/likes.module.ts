import { Module } from '@nestjs/common';
import { LikesService } from './likes.service.js';
import { LikesController } from './likes.controller.js';

@Module({
  providers: [LikesService],
  controllers: [LikesController]
})
export class LikesModule {}
