import { Controller, Get, Param, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { PostTag } from './entity/post-tag';

@Controller('tag')
export class TagController {

    constructor(private tagService: TagService) { }

    @Get()
    async getTags(@Query('searchName') searchName: string): Promise<PostTag[]> {
        return this.tagService.findTags(searchName)
    }

    @Get(':id')
    async getTagById(@Param('id') tagId: string): Promise<PostTag> {
        return this.tagService.findTagById(+tagId)
    }
}
