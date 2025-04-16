import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Request } from "express";
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Notification } from './notification';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getNotifications(@Req() req: Request): Promise<Notification[]> {
        return this.notificationService.getNotifications(+req.user.sub);
    }
}
