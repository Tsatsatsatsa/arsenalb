import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ReactionType } from "../reaction";

export class CreateReactionDto {
   
   
    
    @IsEnum(ReactionType)
    @IsNotEmpty()
    type:ReactionType;

    // @IsNumber()
    // @IsNotEmpty()
    // userId?: number;

    // @IsNumber()
    // @IsNotEmpty()
    // postId?: number;
  
    @IsNumber()
    @IsNotEmpty()
    commentaryId: number;

}