import {
    Router, Request, Response, NextFunction,
} from 'express';

import { userRouter } from './userRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';
import { authRouter } from './authRouter';
import { ErrorHandler } from '../error';

export const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/posts', postRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/auth', authRouter);

// @ts-ignore
apiRouter.use('*', (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message,
    });
});
