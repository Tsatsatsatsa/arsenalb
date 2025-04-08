import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }


    async validateUser(signInDto: SignInDto) {
        const user = await this.userService.findUser(signInDto);
        const match = await bcrypt.compare(signInDto.password, user.password);

        if (!user && !match) {
            throw new ConflictException('Invalid email or password, please try again.');
        }

        const payload = { sub: user.id, username: user.userName };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };

    }
}
