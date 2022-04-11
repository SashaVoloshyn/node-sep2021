import { Router } from 'express';

import { userController } from '../controllers';
import { userPatchFieldsMiddleware } from '../middlewares/userPatchFields.middleware';
import { userUniqueValueFieldsMiddleware } from '../middlewares/userUniqueNewValueFieldsParch.middleware';
import { userFieldsFilledMiddleware } from '../middlewares/userFieldsFilled.middleware';

export const userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getOne);

userRouter.post('/', userFieldsFilledMiddleware, userController.createOne);

userRouter.patch('/:userId', userPatchFieldsMiddleware, userUniqueValueFieldsMiddleware, userController.updateFields);

userRouter.delete('/:userId', userController.remove);
