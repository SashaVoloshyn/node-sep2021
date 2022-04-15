import { Request } from 'express';

import { IComment } from '../comments.interface';

export interface IRequestComment extends Request {
    comment?: IComment
}
