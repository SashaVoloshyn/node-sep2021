import { Router } from 'express';

import { authController } from '../controllers';
import { authMiddleware, fileMiddleware, userMiddleware } from '../middlewares';

export const authRouter = Router();

authRouter.post(
    '/registration',
    userMiddleware.validatorRegistration,
    userMiddleware.checkExistsEmailAndPhone,
    fileMiddleware.checkUserAvatar,
    authController.registration,
);

authRouter.post(
    '/login',
    userMiddleware.validatorLogin,
    userMiddleware.checkUserByEmail,
    userMiddleware.isCurrentPassword,
    authController.login,
);

authRouter.post(
    '/logout',
    authMiddleware.authorization,
    authMiddleware.checkAccessToken,
    authMiddleware.isUserFromDB,
    authController.logout,
);

authRouter.post(
    '/refresh',
    authMiddleware.authorization,
    authMiddleware.checkRefreshToken,
    authMiddleware.isUserFromDB,
    authController.refresh,
);

authRouter.post(
    '/forgotPassword',
    authMiddleware.isEmailValid,
    userMiddleware.checkUserByEmail,
    authController.sendForgotPassword,
);

authRouter.post(
    '/forgotPassword/set',
    authMiddleware.isPasswordValid,
    authMiddleware.checkActionToken,
    authController.setPassword,
);
