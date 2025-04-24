import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostTag } from './entity/post-tag';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(PostTag)
        private postTagRepository: Repository<PostTag>
    ) { }


    async findTags(searchName: string): Promise<PostTag[]> {
        return await this.postTagRepository.find({
            where: { title: Like(`%${searchName}%`) }
        })
    }
}
