import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>
    ) { }

    async createNotification(commentaryId: number, parentCommentaryUserId: number, userId: number): Promise<void> {
        const notification = await this.notificationRepository.create({
            user: { id: userId },
            commentary: { id: commentaryId },
            parentCommentaryUser: { id: parentCommentaryUserId }
        });
        this.notificationRepository.save(notification)
    }


    async getNotifications(userId: number) {
        return await this.notificationRepository.find({
            where: { parentCommentaryUser: { id: userId } },
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
}
