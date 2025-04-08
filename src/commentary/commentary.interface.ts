import { Reaction } from "src/reaction/reaction.interface";

export interface ICommentary {
    id: number;
    commentary: string;
    parentCommentary: { id: number } | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    replies: Array<ICommentary>
    reactions? :Reaction,
    user: { userName: string }
}