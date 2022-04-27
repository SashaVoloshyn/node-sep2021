import { Router } from 'express';

import { userController } from '../controllers';
import { userMiddleware } from '../middlewares';

export const userRouter = Router();

userRouter.get('/', userController.getUsersPagination);

userRouter.get('/:userId', userController.getOne);

userRouter.patch(
    '/:userId',
    userMiddleware.checkUserByParams,
    userMiddleware.updateFields,
    userMiddleware.checkExistsEmailAndPhone,
    userController.updateFields,
);

userRouter.delete(
    '/:userId',
    userMiddleware.checkUserByParams,
    userController.remove,
);
