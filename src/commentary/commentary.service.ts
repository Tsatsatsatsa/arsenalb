import { Injectable } from '@nestjs/common';
import { Commentary } from './commentary';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class CommentaryService {
    constructor(
        @InjectRepository(Commentary)
        private commentaryRepository: Repository<Commentary>,
        private notificationService: NotificationService
    ) { }

    async create(createCommentaryDto: CreateCommentaryDto, userId: number): Promise<Commentary> {
        const { commentary, postId, parentCommentaryId, parentCommentaryUserId } = createCommentaryDto;

        const comment = await this.commentaryRepository.create({ commentary, user: { id: userId }, post: { id: postId }, parentCommentary: { id: parentCommentaryId } })
        const savedComment = await this.commentaryRepository.save(comment)

        if (savedComment.parentCommentary && parentCommentaryUserId !== userId) {
            this.notificationService.createNotification(savedComment.id,parentCommentaryUserId, userId)
        }

        return savedComment
    }

    async getCommentariesByPostId(postId: number, userId?: number): Promise<any> {
        const allComments = await this.commentaryRepository.find({
            where: { post: { id: postId } },
            relations:
                [
                    'parentCommentary',
                    'user',
                    'reactions',
                    'reactions.user'
                ],
            order: { createdAt: 'DESC' },
            select: {
                parentCommentary: {
                    id: true
                },
                user: {
                    id: true,
                    userName: true
                },
                reactions: {
                    id: true,
                    type: true,
                    user: {
                        id: true,
                        userName: true
                    }
                }
            }
        });



        const rootComments = allComments.filter(comment => !comment.parentCommentary);

        const buildCommentTree = (comment: any) => {
            comment.replies = allComments.filter(reply => reply.parentCommentary?.id === comment.id);
            comment.replies.forEach(reply => buildCommentTree(reply));


            const obj = {
                like: 0,
                dislike: 0,
                isLiked: false,
                isDisliked: false
            };
            comment.reactions.forEach(e => {
                if (userId === e.user.id && e.type === 1) {
                    obj.isLiked = true
                }
                if (userId === e.user.id && e.type === 0) {
                    obj.isDisliked = true
                }
                e.type === 1 ? obj.like++ : obj.dislike++


            });

            comment.reactions = obj

            return comment

        };

        return rootComments.map(buildCommentTree);



    }




}


