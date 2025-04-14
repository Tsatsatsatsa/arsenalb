import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";
import { jwtConstants } from 'src/auth/constatn';

const jwtService = new JwtService({
    secret: jwtConstants.secret,
  });


export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const header = request.headers['authorization'];

        if (header?.startsWith('Bearer ')) {
            const token = header.split(' ')[1];
            const payload = jwtService.verify(token,
                {
                    secret: jwtConstants.secret
                });
            return payload.sub
        }

        return null
    }

);


