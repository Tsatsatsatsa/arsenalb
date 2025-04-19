import { Commentary } from "src/commentary/commentary";
import { User } from "src/user/user";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isRead: boolean;

    @ManyToOne(() => Commentary, commentary => commentary.notifications)
    commentary: Commentary;

    @ManyToOne(() => User, user => user.notifications)
    user: User;

    @ManyToOne(() => User, parentCommentaryUser => parentCommentaryUser.notifications)
    parentCommentaryUser: User;
}