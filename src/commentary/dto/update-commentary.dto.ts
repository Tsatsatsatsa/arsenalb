import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCommentaryDto {

    @IsString()
    @IsNotEmpty()
    commentary: string;

 
}
