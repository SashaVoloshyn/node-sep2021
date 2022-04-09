import { IComment } from './comments.interface';

export interface IPost {
    title: string;
    text: string;
    userId: number;
    comments: IComment[];
}
