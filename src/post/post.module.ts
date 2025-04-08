import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './post';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Post])],
  controllers:[PostController],
  providers: [PostService]
})
export class PostModule {}
