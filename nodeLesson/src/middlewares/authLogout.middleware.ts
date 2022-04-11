import { Response, NextFunction } from 'express';

import { IRequestAuth } from '../interfaces';
import { tokenService } from '../services';
import { userRepository } from '../repositories';

const authLogoutMiddleware = async (req: IRequestAuth, res: Response, next: NextFunction) => {
    try {
        const { userId } = await tokenService.verifyTokens(req.authorization as string);
        const userFromToken = await userRepository.getOne(userId);

        if (!userFromToken) {
            throw new Error('Wrong Token');
        }

        req.user = userFromToken;

        next();
    } catch (e) {
        res.json({
            status: 400,
            error: (e as Error).message,
        });
    }
};

export { authLogoutMiddleware };
