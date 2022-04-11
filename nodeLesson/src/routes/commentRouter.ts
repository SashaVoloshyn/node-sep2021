import { Router } from 'express';

import { commentController } from '../controllers';

export const commentRouter = Router();

commentRouter.get('/', commentController.getAll);
commentRouter.get('/:commentId', commentController.getOne);

commentRouter.get('/user/:userId', commentController.getUserComments);

commentRouter.post('/', commentController.createOne);

commentRouter.patch('/:commentId', commentController.updateComment);

commentRouter.delete('/:commentId', commentController.remove);
