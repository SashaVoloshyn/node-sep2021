import { IUser } from './users.interface';
import { ICommonFields } from './commonFields.interface';

export interface IToken extends ICommonFields{
    refreshToken: string,
    accessToken: string,
    userId: number,
    user? : IUser
}

export interface ITokenPair {
    accessToken: string,
    refreshToken: string
}

export interface ITokenRepository{
    accessToken: string,
    refreshToken: string,
    userId: number
}

export interface IRoleToken {
    accessToken: string,
    refreshToken: string,
    userId: number,
    role: string
}
