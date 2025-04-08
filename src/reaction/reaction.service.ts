import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from './reaction';
import { Repository } from 'typeorm';
import { CreateReactionDto } from './dto/create-reaction.dto';

@Injectable()
export class ReactionService {
    constructor(
        @InjectRepository(Reaction)
        private reactionRepository: Repository<Reaction>
    ) { }


    async create(createReactionDto: CreateReactionDto, userId: number): Promise<Reaction> {
        const { type, commentaryId } = createReactionDto;

        const newReaction = await this.reactionRepository.create(
            {
                type, user: { id: userId },
                commentary: { id: commentaryId }
            });
        return this.reactionRepository.save(newReaction)
    }


    async update(createReactionDto: CreateReactionDto, userId: number): Promise<Reaction> {
        const reaction = await this.findReaction(createReactionDto.commentaryId, userId)

        reaction.type = createReactionDto.type;
        return this.reactionRepository.save(reaction);


    }


    async delete(commentarytId: number, userId: number): Promise<Reaction> {
        const reaction = await this.findReaction(commentarytId, userId)

        return this.reactionRepository.remove(reaction)
    }


    private findReaction(commentaryId: number, userId: number): Promise<Reaction> {
        return this.reactionRepository.findOne({
            where: { user: { id: userId }, commentary: { id: commentaryId } }
        })
    }
}
