import { IRequestUser } from './requestUser.interface';

export interface IRequestAuth extends IRequestUser {
    authorization?: string
}
