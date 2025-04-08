

export interface IPost {
    id: number;
    title: string;
    imgUrl: string;
    article: string;
    // userID:number;
    shortDescription: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}