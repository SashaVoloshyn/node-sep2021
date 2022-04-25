import { Request } from 'express';

import { IUser } from '../users.interface';

export interface IRequestExtended extends Request{
    user?: IUser
}
