import { Router } from 'express';

import { commentController } from '../controllers';
import { commentMiddleware } from '../middlewares';

export const commentRouter = Router();

commentRouter.get('/', commentController.getAll);
commentRouter.get('/:commentId', commentController.getOne);

commentRouter.get('/user/:userId', commentController.getUserComments);

commentRouter.post('/', commentMiddleware.validator, commentMiddleware.userExists, commentController.createOne);

commentRouter.patch('/:commentId', commentMiddleware.fieldsForUpdate, commentController.updateComment);

commentRouter.delete('/:commentId', commentController.remove);
