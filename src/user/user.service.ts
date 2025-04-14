import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user';
import { SignInDto } from 'src/auth/dto/signIn.dto';
import { SignUpDto } from 'src/auth/dto/signUp.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findUserByEmailAndUsername(signUpDto: SignUpDto): Promise<{ id: number, userName: string, password: string, email: string } | null> {
        return await this.userRepository.findOne({
            where: [
                { email: signUpDto.email },
                { userName: signUpDto.userName }
            ]
        });

    }



    async findUserByEmail(signInDto: SignInDto): Promise<{ id: number, userName: string, password: string, email: string } | null> {
        return await this.userRepository.findOne(
            {
                where:
                    { email: signInDto.email }
            });

    }


    async createUser(signUpDto: SignUpDto): Promise<{ statusCode: number; message: string }> {
        signUpDto.password = await bcrypt.hash(signUpDto.password, 10);
        this.userRepository.save(signUpDto);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'User registered successfully',
        };
    }


}
