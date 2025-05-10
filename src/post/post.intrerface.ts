import { PostTag } from "src/tag/entity/post-tag";


export interface IPost {
    id: number;
    title: string;
    imgUrl: string;
    article: string;
    tags?: PostTag[]
    // userID:number;
    shortDescription: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}