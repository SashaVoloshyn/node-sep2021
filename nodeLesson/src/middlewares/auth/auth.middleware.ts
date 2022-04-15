import { NextFunction, Response } from 'express';

import { IRequestAuth } from '../../interfaces';
import { constants } from '../../constants';
import { authTokenSchema } from '../../helpers';
import { ErrorHandler } from '../../error';
import { userRepository } from '../../repositories';
import { tokenService } from '../../services';

class AuthMiddleware {
    public async authorization(req: IRequestAuth, _:Response, next:NextFunction):Promise<void> {
        try {
            const authorization = await req.get(constants.AUTHORIZATION);
            const { error } = authTokenSchema.validate({ authorization });

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.authorization = authorization;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isUserFromDB(req: IRequestAuth, _: Response, next:NextFunction): Promise<void> {
        try {
            const userFromToken = await userRepository.getOne(req.userId as number);

            if (!userFromToken) {
                next(new ErrorHandler('Wrong Token', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkAccessToken(req:IRequestAuth, _:Response, next:NextFunction): Promise<void> {
        try {
            const { userId } = await tokenService.verifyTokens(req.authorization as string);
            const tokens = await tokenService.findToken(userId);

            if (tokens?.accessToken !== req.authorization) {
                next(new ErrorHandler('Wrong Token', 401));
                return;
            }

            req.userId = userId;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req:IRequestAuth, _:Response, next:NextFunction): Promise<void> {
        try {
            const { userId } = await tokenService.verifyTokens(req.authorization as string, constants.REFRESH);
            const tokens = await tokenService.findToken(userId);

            if (tokens?.refreshToken !== req.authorization) {
                next(new ErrorHandler('Wrong Token', 401));
                return;
            }

            req.userId = userId;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
