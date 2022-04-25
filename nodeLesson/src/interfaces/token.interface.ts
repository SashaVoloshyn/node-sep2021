import { IUser } from './users.interface';
import { ICommonFields } from './commonFields.interface';

import { ActionTokenTypes } from '../enums';
import { IRole } from './role.interface';

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

export interface IActionToken extends ICommonFields {
    userId: number,
    actionToken: string;
    type: ActionTokenTypes;
}

export interface IActionTokenToSave {
    userId: number;
    actionToken: string;
    type: ActionTokenTypes;
}

export interface IVerifyTokens extends IRole {
    forgotToken: string,
    email: string,
}

export interface IActionTokenRepository {
    userId: number
    token: string,
}
