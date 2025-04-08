import { Post } from "src/post/post";
import { Reaction } from "src/reaction/reaction";
import { User } from "src/user/user";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class Commentary {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commentary: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Commentary, commentary => commentary.parentCommentary)
    replies: Commentary[];

    @ManyToOne(() => Commentary, commentary => commentary.replies, { nullable: true })
    parentCommentary: Commentary;

    @ManyToOne(() => User, user => user.commentaries)
    user: User;

    @ManyToOne(() => Post, post => post.commentaries)
    post: Post;

    @OneToMany(() => Reaction, reaction => reaction.commentary)
    reactions: Reaction[];
}