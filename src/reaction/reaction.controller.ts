import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Reaction } from './reaction';

@Controller('reaction')
export class ReactionController {
    constructor(private reactionService: ReactionService) { }


    @UseGuards(JwtAuthGuard)
    @Post()
    async crateMessage(@Body() createReactionDto: CreateReactionDto, @Req() req: any): Promise<Reaction> {
        return this.reactionService.create(createReactionDto, req.user.sub)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateMessage(@Body() createReactionDto: CreateReactionDto, @Req() req: any): Promise<Reaction> {
        return this.reactionService.update(createReactionDto, req.user.sub)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':commentaryId')
    async deleteMessage(@Param('commentaryId') id: string, @Req() req: any): Promise<Reaction> {
        return this.reactionService.delete(+id, req.user.sub)
    }


}
