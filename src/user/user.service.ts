import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from 'src/auth/dto/signIn.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async registerUser(createUserDto: CreateUserDto): Promise<{ statusCode: number; error?: string, message: string }> {
        const { confirmPassword, ...userData } = createUserDto;

        const existingUser = await this.userRepository.findOne({
            where: [
                { email: userData.email },
                { userName: userData.userName }
            ]
        });



        if (existingUser) {
            throw new ConflictException('User already exists');

        }


        userData.password = await bcrypt.hash(userData.password, 10);
        this.userRepository.save(userData);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'User registered successfully',
        };
    }


    async findUser(signInDto: SignInDto) {
        return await this.userRepository.findOne(
            {
                where:
                    { email: signInDto.email }
            });
    }


}
