import { IRequestUser } from './requestUser.interface';

export interface IRequestAuth extends IRequestUser {
    userId?: number,
    authorization?: string
}
