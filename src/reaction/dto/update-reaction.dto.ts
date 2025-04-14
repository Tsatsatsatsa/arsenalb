import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ReactionType } from "../reaction";

export class UpdateReactionDto {

    @IsEnum(ReactionType)
    @IsNotEmpty()
    type: ReactionType;

}