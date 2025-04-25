import { Post } from "src/post/post";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class PostTag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(() => Post, post => post.tags)
    posts: Post[]
}