import { Body, Controller, Get, Put, Query, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Request } from "express";
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CommentaryNotification } from './entity/commentary-notification';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getNotifications(@Req() req: Request, @Query('page') page: number = 1, @Query('limit') limit: number = 5)
        : Promise<{ data: CommentaryNotification[], meta: { total: number, page: number, last_page: number } }> {
        return this.notificationService.getNotifications(+req.user.sub, page, limit);
    }

    @UseGuards(JwtAuthGuard)
    @Get('total')
    async getUnreadNotificationsTotal(@Req() req: Request): Promise<number> {
        return this.notificationService.getUnreadNotificationsTotal(+req.user.sub);
    }
}
