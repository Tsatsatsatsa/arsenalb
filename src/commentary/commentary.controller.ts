import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Request } from "express";
import { Commentary } from './commentary';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';


@Controller('commentary')
export class CommentaryController {
    constructor(private commentaryService: CommentaryService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createCommentary(@Body() createCommentaryDto: CreateCommentaryDto, @Req() req: Request): Promise<Commentary> {
        return this.commentaryService.create(createCommentaryDto, +req.user.sub)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateCommentary(@Param('id') id: string, @Body() updateCommentaryDto: UpdateCommentaryDto) {
        console.log(id, updateCommentaryDto)
    }

    @Get(':id')
    getCommentariesByPostId(@Param('id') id: string, @CurrentUser() userId: number | null) {
        return this.commentaryService.getCommentariesByPostId(+id, userId)
    }
}
