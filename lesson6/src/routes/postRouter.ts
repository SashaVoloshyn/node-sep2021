import { Router } from 'express';
import { postController } from '../controllers/postController';

export const postRouter = Router();

postRouter.get('/', postController.getAll);
postRouter.get('/:postId', postController.getOne);

postRouter.get('/user/:userId', postController.getUserPosts);

postRouter.post('/', postController.createOne);

postRouter.patch('/', postController.updatePost);

postRouter.delete('/:postId', postController.removeOne);
