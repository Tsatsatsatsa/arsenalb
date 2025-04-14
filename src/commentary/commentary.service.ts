import { Injectable } from '@nestjs/common';
import { Commentary } from './commentary';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentaryDto } from './dto/create-commentary.dto';

@Injectable()
export class CommentaryService {
    constructor(
        @InjectRepository(Commentary)
        private commentaryRepository: Repository<Commentary>
    ) { }

    async create(createCommentaryDto: CreateCommentaryDto, userId: number): Promise<Commentary> {
        const { commentary, postId, parentCommentaryId } = createCommentaryDto;
        const comment = await this.commentaryRepository.create({ commentary, user: { id: userId }, post: { id: postId }, parentCommentary: { id: parentCommentaryId } })
        return this.commentaryRepository.save(comment)
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


