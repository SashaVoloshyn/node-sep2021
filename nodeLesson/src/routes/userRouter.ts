import { Router } from 'express';

import { userController } from '../controllers';
import { userMiddleware } from '../middlewares';

export const userRouter = Router();

userRouter.get('/', userController.getAll);

userRouter.get('/:userId', userController.getOne);

userRouter.patch(
    '/:userId',
    userMiddleware.updateFields,
    userMiddleware.checkUserByPhone,
    userMiddleware.checkUserByEmail,
    userMiddleware.checkUserByParams,
    userMiddleware.isCurrentPassword,
    userController.updateFields,
);

userRouter.delete(
    '/:userId',
    userMiddleware.checkUserByParams,
    userController.remove,
);
