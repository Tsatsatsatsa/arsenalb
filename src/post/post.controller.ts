import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { IPost } from './post.intrerface';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) { }


    @Get()
    async getAll(): Promise<IPost[]> {
        return this.postService.findAllPosts();
    }

    @Get(':id')
    async getPostById(@Param('id') id: string): Promise<IPost> {
        return this.postService.findPostById(+id)
    }

    @Get('tag/:id')
    async getPostByTagId(@Param('id') tagId: string): Promise<IPost[]> {
        return this.postService.findPostByTagId(+tagId);
    }


    @UseGuards(JwtAuthGuard)
    @Post()
    async createPost(@Body() createPostDto: CreatePostDto, @Req() req: any): Promise<IPost> {
        return this.postService.createPost(createPostDto, req.user.sub);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removePost(@Param('id') id: string): Promise<IPost> {
        return this.postService.removePost(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<IPost> {
        return this.postService.updatePost(+id, updatePostDto);
    }



}
