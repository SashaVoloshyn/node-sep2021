import { NextFunction, Request, Response } from 'express';

import { IRequestPost, IPost } from '../../interfaces';
import { postSchema } from '../../helpers';
import { ErrorHandler } from '../../error';
import { userService } from '../../services';

class PostMiddleware {
    public fieldsFilled(req:IRequestPost, _:Response, next:NextFunction): void {
        try {
            const { error, value } = postSchema.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            req.post = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async userExists(req:IRequestPost, _: Response, next:NextFunction):Promise<void> {
        try {
            const { userId } = req.post as IPost;

            const user = await userService.getOne(userId);

            if (!user) {
                next(new ErrorHandler('Data Invalid'));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public async fieldsForUpdate(req:Request, _:Response, next:NextFunction):Promise<void> {
        try {
            const { text } = req.body;

            if (!text || typeof text !== 'string') {
                next(new ErrorHandler('not all fields are filled or not valid data'));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const postMiddleware = new PostMiddleware();
