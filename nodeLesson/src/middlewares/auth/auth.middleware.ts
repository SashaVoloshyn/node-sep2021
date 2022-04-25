import { NextFunction, Response } from 'express';

import { IRequestAuth, IRequestExtended, IVerifyTokens } from '../../interfaces';
import { constants } from '../../constants';
import { authEmail, authPassword, authTokenSchema } from '../../helpers';
import { ErrorHandler } from '../../error';
import { actionTokenRepository, userRepository } from '../../repositories';
import { tokenService, userService } from '../../services';

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

    public isEmailValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authEmail.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message, 400));
                return;
            }

            req.body = value;
            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public isPasswordValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authPassword.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
                return;
            }

            req.body = value;
            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction):Promise<IVerifyTokens | undefined> {
        try {
            const actionToken = req.get(constants.AUTHORIZATION);

            if (!actionToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            // @ts-ignore
            const { userEmail } = await tokenService.verifyTokens(actionToken, constants.ACTION);
            if (!userEmail) {
                next(new ErrorHandler('oops, some wrong'));
                return;
            }

            const tokenFromDB = await actionTokenRepository.findByParams({ actionToken });

            if (!tokenFromDB) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            const userFromToken = await userService.getByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            req.user = userFromToken;
            next();
        } catch (e: any) {
            res.status(401)
                .json({
                    status: 401,
                    message: e.message,
                });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
