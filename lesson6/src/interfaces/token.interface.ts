import { IUser } from './users.interface';
import { ICommonFields } from './commonFields.interface';

export interface IToken extends ICommonFields{
    refreshToken: string,
    userId: number,
    user? : IUser
}

export interface ITokenPair {
    accessToken: string,
    refreshToken: string
}

export interface IRefreshToken{
    refreshToken: string,
    userId: number
}

export interface IRoleToken {
    accessToken: string,
    refreshToken: string,
    userId: number,
    role: string
}
