import { Commentary } from "src/commentary/commentary";
import { Post } from "src/post/post";
import { User } from "src/user/user";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



export enum ReactionType {
    LIKE,
    DISLIKE
}


@Entity()
export class Reaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: ReactionType })
    type: ReactionType;

    @ManyToOne(() => User, user => user.reactions, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Post, post => post.reactions, { onDelete: 'CASCADE' })
    post: Post

    @ManyToOne(() => Commentary, commentary => commentary.reactions, { onDelete: 'CASCADE' })
    commentary: Commentary
}