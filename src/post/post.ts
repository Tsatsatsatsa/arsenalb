import { Commentary } from "src/commentary/commentary";
import { Reaction } from "src/reaction/reaction";
import { PostTag } from "src/tag/entity/post-tag";
import { User } from "src/user/user";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column()
    imgUrl: string;

    @Column({ type: 'longtext' })
    article: string;

    @Column({ length: 255 })
    shortDescription: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Commentary, commentary => commentary.post)
    commentaries: Commentary[];

    @OneToMany(() => Reaction, reaction => reaction.post)
    reactions: Reaction[];

    @ManyToOne(() => User, user => user.posts)
    user: User;

    @ManyToMany(() => PostTag, tag => tag.posts)
    @JoinTable()
    tags: PostTag[]
}