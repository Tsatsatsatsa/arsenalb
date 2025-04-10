import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    register(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto)
        return this.userService.registerUser(createUserDto)
    }

}
