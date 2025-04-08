import { Module } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CommentaryController } from './commentary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commentary } from './commentary';

@Module({
  imports:[TypeOrmModule.forFeature([Commentary])],
  providers: [CommentaryService],
  controllers: [CommentaryController]
})
export class CommentaryModule {}
