import { Module } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CommentaryController } from './commentary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commentary } from './commentary';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports:[TypeOrmModule.forFeature([Commentary]),NotificationModule],
  providers: [CommentaryService],
  controllers: [CommentaryController]
})
export class CommentaryModule {}
