import { IsString,IsOptional, IsUrl } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;


  @IsUrl()
  @IsOptional()
  imgUrl?: string;

  @IsString()
  @IsOptional()
  article?: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;
}
