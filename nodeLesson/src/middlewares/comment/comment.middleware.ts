import { Request, Response, NextFunction } from 'express';

import { IComment, IRequestComment } from '../../interfaces';
import { commentSchema } from '../../helpers';
import { ErrorHandler } from '../../error';
import { userService } from '../../services';

class CommentMiddleware {
    public validator(req:IRequestComment, _:Response, next:NextFunction): void {
        try {
            const { error, value } = commentSchema.validate(req.body);
            console.log(value);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            req.comment = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async userExists(req:IRequestComment, _:Response, next:NextFunction):Promise<void> {
        try {
            const { authorId } = req.comment as IComment;
            const user = await userService.getOne(authorId);

            if (!user) {
                next(new ErrorHandler('Not Valid Data'));
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
            if (!text) {
                next(new ErrorHandler('not all fields are filled or not valid data'));
                return;
            }
            next();
        } catch (e) {
            if (e) {
                next(e);
            }
        }
    }
}

export const commentMiddleware = new CommentMiddleware();
