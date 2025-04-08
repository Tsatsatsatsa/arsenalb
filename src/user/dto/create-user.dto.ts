import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Match } from "src/decorators/match.decorator";



export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @Match('password')
    confirmPassword: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

}