import { Router } from 'express';

import { authController } from '../controllers';
import {
    authLogoutMiddleware,
    authorizationMiddleware,
    tokenPairMiddleware,
    userExistsMiddleware,
    userFieldsLoginMiddleware,
    userSignInMiddleware,
    userTypeLoginMiddleware,
} from '../middlewares';

export const authRouter = Router();

authRouter.post('/registration', authController.registration);
authRouter.post(
    '/login',
    userFieldsLoginMiddleware,
    userTypeLoginMiddleware,
    userExistsMiddleware,
    userSignInMiddleware,
    authController.login,
);
authRouter.post('/logout', authorizationMiddleware, authLogoutMiddleware, authController.logout);
authRouter.post('/refresh', authorizationMiddleware, tokenPairMiddleware, authController.refresh);
