import { Commentary } from "src/commentary/commentary";
import { User } from "src/user/user";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class CommentaryNotification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isRead: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => Commentary, commentary => commentary.notifications)
    commentary: Commentary;

    @ManyToOne(() => User, user => user.notifications)
    user: User;

    @ManyToOne(() => User, parentCommentaryUser => parentCommentaryUser.notifications)
    parentCommentaryUser: User;
}