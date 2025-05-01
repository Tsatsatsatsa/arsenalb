import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post';
import { In, Not, Repository } from 'typeorm';
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
        return this.postRepository.find({
            order: { createdAt: 'DESC' }
        })
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

    async findPostsByTagId(tagId: number): Promise<IPost[]> {
        return await this.postRepository.find({
            where: { tags: { id: tagId } }
        })
    }

    async findSimilarPostsByTag(tagIds: string, postId: number): Promise<IPost[]> {
        const tagId = tagIds.split(',').map(el => Number(el));

        const posts = await this.postRepository.find({
            where: {
                tags: { id: In(tagId) },
                id: Not(postId)
            },
            order: { createdAt: 'DESC' },
            relations: ['tags']
        })

        const filteredPosts: IPost[] = []

        const filterTags = (posts: IPost[], index: number) => {
            if (index === 0 || filteredPosts.length >= 5) return;
            posts.forEach((el: IPost) => {
                if (filteredPosts.length >= 5) return;
                if (el.tags.length === index) {
                    if (tagId.some(id => el.tags.some(tag => tag.id === id))) {
                        filteredPosts.push(el)
                    }
                }
            })

            filterTags(posts, index - 1)



        }

        filterTags(posts, tagId.length)

        return filteredPosts

    }


}
