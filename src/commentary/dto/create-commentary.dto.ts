


import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCommentaryDto {

  
  @IsString()
  @IsNotEmpty()
  commentary: string;

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsNumber()
  @IsOptional()
  parentCommentaryId?: number;

}
