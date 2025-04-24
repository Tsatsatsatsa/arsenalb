import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class PostTag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
}