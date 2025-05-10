import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post';
import { In, Not, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { IPost } from './post.intrerface';
import { UpdatePostDto } from './dto/update-post.dto';
import { take } from 'rxjs';
import { get } from 'http';

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

        let posts: IPost[] = []

        const findSimilarPosts = async (currentTags: number[], excludedPostIds: number[] = []): Promise<IPost[]> => {
            if (currentTags.length === 0) return

            const query = await this.postRepository
                .createQueryBuilder("post")
                .select("post")
                .innerJoin("post.tags", "tag")
                .where("tag.id IN (:...tagIds)", { tagIds: currentTags })
                .andWhere("post.id != :postId", { postId })

            if (excludedPostIds.length > 0) {
                query.andWhere("post.id NOT IN (:...postIds)", { postIds: excludedPostIds })
                    .limit(5 - excludedPostIds.length)

            }
            query
                .groupBy("post.id")
                .having("COUNT(DISTINCT tag.id) = :count", { count: currentTags.length })
                .orderBy("post.createdAt", "DESC")

            posts = [...posts, ...await query.getMany()]
            excludedPostIds = posts.map(el => el.id)


            if (posts.length < 5) {
                currentTags.pop()
                return await findSimilarPosts(currentTags, excludedPostIds)
            }

            return posts;
        };

         return await findSimilarPosts(tagId)


    }


}
