import { IComment } from './comments.interface';
import { IPost } from './posts.interface';
import { ICommonFields } from './commonFields.interface';

export interface IUser extends ICommonFields{
    firstName: string;
    lastName: string;
    age?: number;
    phone: string;
    email: string;
    password: string;
    posts: IPost[];
    comments: IComment[];

}

export interface IUserPayload {
    userId: number,
    userEmail: string,
}
