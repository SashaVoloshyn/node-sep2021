import { Request } from 'express';

import { IUser } from '../users.interface';

export interface IRequestUser extends Request {
    user?: IUser;
}
