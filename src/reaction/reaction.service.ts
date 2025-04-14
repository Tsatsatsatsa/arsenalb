import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from './reaction';
import { Repository } from 'typeorm';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';

@Injectable()
export class ReactionService {
    constructor(
        @InjectRepository(Reaction)
        private reactionRepository: Repository<Reaction>
    ) { }


    async createReaction(createReactionDto: CreateReactionDto, userId: number): Promise<Reaction> {
        const { type, commentaryId } = createReactionDto;

        const newReaction = await this.reactionRepository.create(
            {
                type, user: { id: userId },
                commentary: { id: commentaryId }
            });
        return this.reactionRepository.save(newReaction)
    }


    async updateReaction(commentaryId: number, updateReactionDto: UpdateReactionDto, userId: number): Promise<Reaction> {
        const reaction = await this.findReaction(commentaryId, userId)

        reaction.type = updateReactionDto.type;
        return this.reactionRepository.save(reaction);


    }


    async deleteReaction(commentarytId: number, userId: number): Promise<Reaction> {
        const reaction = await this.findReaction(commentarytId, userId)

        return this.reactionRepository.remove(reaction)
    }


    private findReaction(commentaryId: number, userId: number): Promise<Reaction> {
        return this.reactionRepository.findOne({
            where: { user: { id: userId }, commentary: { id: commentaryId } }
        })
    }
}
