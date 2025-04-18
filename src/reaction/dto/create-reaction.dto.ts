import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ReactionType } from "../reaction";

export class CreateReactionDto {
    
    @IsEnum(ReactionType)
    @IsNotEmpty()
    type:ReactionType;
  
    @IsNumber()
    @IsNotEmpty()
    commentaryId: number;

}