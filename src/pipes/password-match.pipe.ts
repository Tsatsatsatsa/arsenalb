import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class PasswordMatchPipe implements PipeTransform {
    transform(createUserDto: any) {
        if (createUserDto.password !== createUserDto.confirmPassword) {
            throw new BadRequestException('Password and confirm password do not match');
          }
          return createUserDto;
        }
    }