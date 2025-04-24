import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTag } from './entity/post-tag';
import { TagController } from './tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostTag])],
  controllers:[TagController],
  providers: [TagService]
})
export class TagModule {}
