import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('signin')
    signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
        return this.authService.validateUser(signInDto);
    }

    @Post('signup')
    register(@Body() createUserDto: CreateUserDto): Promise<{ statusCode: number; error?: string, message: string }> {
        return this.authService.registerUser(createUserDto)
    }
}
