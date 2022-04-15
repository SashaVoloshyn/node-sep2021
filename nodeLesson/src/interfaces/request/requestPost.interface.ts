import { Request } from 'express';

import { IPost } from '../posts.interface';

export interface IRequestPost extends Request{
    post?: IPost
}
