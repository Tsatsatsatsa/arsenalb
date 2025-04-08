import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ICommentary } from './commentary.interface';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { Commentary } from './commentary';

@Controller('commentary')
export class CommentaryController {
    constructor(private commentaryService: CommentaryService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createCommentary(@Body() createCommentaryDto: CreateCommentaryDto, @Req() req: any): Promise<Commentary> { 
        return this.commentaryService.create(createCommentaryDto, req.user.sub)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getCommentariesByPostId(@Param('id') id:string, @Req() req?:any) {
        return this.commentaryService.getCommentariesByPostId(+id, req?.user?.sub)
    }
}
