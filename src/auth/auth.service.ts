import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }


    async validateUser(signInDto: SignInDto): Promise<{ access_token: string }> {
        const user = await this.userService.findUserByEmail(signInDto);
        const match = await bcrypt.compare(signInDto.password, user.password);

        if (!user && !match) {
            throw new ConflictException('Invalid email or password, please try again.');
        }

        const payload = { sub: user.id, username: user.userName };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };

    }


    async registerUser(createUserDto: CreateUserDto): Promise<{ statusCode: number; error?: string, message: string }> {
        const { confirmPassword, ...userData } = createUserDto;

        const existingUser = await this.userService.findUserByEmailAndUsername(userData)


        if (existingUser) {
            throw new ConflictException('User already exists');

        }

        return await this.userService.createUser(userData)

    }

}
