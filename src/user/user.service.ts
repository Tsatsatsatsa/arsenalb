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
        private userRepsitory: Repository<User>
    ) { }

    async registerUser(createUserDto: CreateUserDto) {
        delete createUserDto.confirmPassword;
        const existingUser = await this.userRepsitory.findOne(
            {
                where:
                    { email: createUserDto.email, userName: createUserDto.userName }
            });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }


        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        this.userRepsitory.save(createUserDto);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'User registered successfully',
        };
    }


    async findUser(signInDto: SignInDto) {
        return await this.userRepsitory.findOne(
            {
                where:
                    { email: signInDto.email }
            });
    }


}
