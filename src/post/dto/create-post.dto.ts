import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsOptional()
  imgUrl?: string;

  @IsString()
  @IsNotEmpty()
  article: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;
}
