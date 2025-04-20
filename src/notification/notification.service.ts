import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentaryNotification } from './entity/commentary-notification';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(CommentaryNotification)
        private notificationRepository: Repository<CommentaryNotification>
    ) { }

    async createNotification(commentaryId: number, parentCommentaryUserId: number, userId: number): Promise<void> {
        const notification = await this.notificationRepository.create({
            user: { id: userId },
            commentary: { id: commentaryId },
            parentCommentaryUser: { id: parentCommentaryUserId }
        });
        this.notificationRepository.save(notification)
    }


    async getNotifications(userId: number): Promise<CommentaryNotification[]> {
        return await this.notificationRepository.find({
            where: { parentCommentaryUser: { id: userId }, isRead: false },
            relations: ['commentary', 'user'],
            select: {
                commentary: {
                    commentary: true
                },
                user: {
                    userName: true
                }
            }

        })

    }

    async updateNotifications(notificationIds: number[]): Promise<{ statusCode: number; message: string }> {
        for (let notificationId of notificationIds) {
            await this.notificationRepository.update({ id: notificationId, isRead: false }, { isRead: true });
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Notifications updated',
        };
    }
}
