import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { StorageModule } from '../storage/storage.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    StorageModule,
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'post_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
