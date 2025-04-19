import { Commentary } from "src/commentary/commentary";
import { Notification } from "src/notification/notification";
import { Post } from "src/post/post";
import { Reaction } from "src/reaction/reaction";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userName: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => Commentary, commentary => commentary.user)
    commentaries: Commentary[];

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @OneToMany(() => Reaction, reaction => reaction.user)
    reactions: Reaction[]

    @OneToMany(() => Notification, notification => notification.user)
    notifications: Notification[]

    @OneToMany(() => Notification, notification => notification.parentCommentaryUser)
    parentCommentaryUsers: Notification[];
}