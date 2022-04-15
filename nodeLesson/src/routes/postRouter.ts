import { Router } from 'express';

import { postController } from '../controllers';
import { postMiddleware } from '../middlewares';

export const postRouter = Router();

postRouter.get('/', postController.getAll);
postRouter.get('/:postId', postController.getOne);

postRouter.get('/user/:userId', postController.getUserPosts);

postRouter.post('/', postMiddleware.fieldsFilled, postMiddleware.userExists, postController.createOne);

postRouter.patch('/', postMiddleware.fieldsForUpdate, postController.updatePost);

postRouter.delete('/:postId', postController.removeOne);
