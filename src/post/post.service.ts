import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { IPost } from './post.intrerface';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) { }

    async findAllPosts(): Promise<IPost[]> {
        return this.postRepository.find()
    }

    async findPostById(id: number): Promise<Post> {
        return await this.postRepository.findOne({
            where: { id },
            relations: ['tags']
        });
    }

    async createPost(createPostDto: CreatePostDto, userId: number): Promise<IPost> {
        const newPost = await this.postRepository.create({ ...createPostDto, user: { id: userId } });
        return this.postRepository.save(newPost)
    }

    async removePost(id: number): Promise<IPost> {
        const post = await this.postRepository.findOneBy({ id });
        return this.postRepository.remove(post)
    }

    async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<IPost> {
        const post = await this.postRepository.findOneBy({ id });
        return this.postRepository.save({ ...post, ...updatePostDto });
    }

    async findPostByTagId(tagId: number): Promise<IPost[]> {
        return await this.postRepository.find({
            where: { tags: { id: tagId } }
        })
    }
}
