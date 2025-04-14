import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { Request } from 'express'
import { CreateReactionDto } from './dto/create-reaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Reaction } from './reaction';
import { UpdateReactionDto } from './dto/update-reaction.dto';

@Controller('reaction')
export class ReactionController {
    constructor(private reactionService: ReactionService) { }


    @UseGuards(JwtAuthGuard)
    @Post()
    async createReaction(@Body() createReactionDto: CreateReactionDto, @Req() req: Request): Promise<Reaction> {
        return this.reactionService.createReaction(createReactionDto, +req.user.sub)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':commentaryId')
    async updateReaction(@Param('commentaryId') id: string, @Body() updateReactionDto: UpdateReactionDto, @Req() req: Request): Promise<Reaction> {
        return this.reactionService.updateReaction(+id, updateReactionDto, +req.user.sub)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':commentaryId')
    async deleteReaction(@Param('commentaryId') id: string, @Req() req: Request): Promise<Reaction> {
        return this.reactionService.deleteReaction(+id, +req.user.sub)
    }


}
