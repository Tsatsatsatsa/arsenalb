import { Injectable } from '@nestjs/common';
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


    async getNotifications(userId: number, page: number, limit: number): Promise<{ data: CommentaryNotification[], meta: { total: number, page: number, last_page: number } }> {

        // update notifications unRead to read 
        await this.notificationRepository.update({ parentCommentaryUser: { id: userId }, isRead: false }, { isRead: true });

        const skip = (page - 1) * limit;
        const [items, total] = await this.notificationRepository.findAndCount({
            where: { parentCommentaryUser: { id: userId } },
            relations: ['commentary', 'user'],
            select: {
                id: true,
                commentary: {
                    commentary: true
                },
                user: {
                    userName: true
                }
            },
            skip,
            take: limit
        });

        return {
            data: items,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit)
            }
        }

    }

    async getUnreadNotificationsTotal(userId: number): Promise<number> {
        const result = await this.notificationRepository.find({
            where: { parentCommentaryUser: { id: userId }, isRead: false },
        })
        return result.length
    }
}
