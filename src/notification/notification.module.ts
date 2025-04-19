import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaryNotification } from './entity/commentary-notification';
import { NotificationController } from './notification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommentaryNotification])],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService]
})
export class NotificationModule { }
