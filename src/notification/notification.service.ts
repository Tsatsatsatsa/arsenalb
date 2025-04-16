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

    async createNotification(commentaryId: number, userId: number): Promise<void> {
        const notification = await this.notificationRepository.create({ user: { id: userId }, commentary: { id: commentaryId } });
        this.notificationRepository.save(notification)
    }


    async getNotifications(userId: number): Promise<Notification[]> {
        const notification = await this.notificationRepository.find({
            where: { commentary: { parentCommentary: { user: { id: userId } } } },
            relations: [
                'commentary',
                'user',
            ],
            select: {
                commentary: {
                    commentary: true
                },
                user: {
                    id: true,
                    userName: true
                }
            }
        })

        return notification.filter(notification => notification.user.id !== userId);
    }
}
