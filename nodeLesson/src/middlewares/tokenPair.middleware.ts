import { Response, NextFunction } from 'express';

import { IRequestAuth } from '../interfaces';
import { tokenService } from '../services';
import { userRepository } from '../repositories';

export const tokenPairMiddleware = async (req:IRequestAuth, res:Response, next:NextFunction) => {
    try {
        const { userId } = await tokenService.verifyTokens(req.authorization as string, 'refresh');
        const userFromToken = await userRepository.getOne(userId);
        const tokens = await tokenService.findToken(userId);

        if (!userFromToken || tokens?.refreshToken !== req.authorization) {
            throw new Error('Wrong Token');
        }

        req.user = userFromToken;

        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};
