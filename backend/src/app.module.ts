import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { PostsModule } from './posts/posts.module.js';
import { StorageModule } from './storage/storage.module.js';
import { FeedModule } from './feed/feed.module.js';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, PostsModule, StorageModule, FeedModule, LikesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
