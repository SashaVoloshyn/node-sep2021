import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import {
    IRequestAuth, IRequestExtended, IRequestUser, IRoleToken, IUser,
} from '../interfaces';
import { constants, COOKIE } from '../constants';
import {
    authService, emailService, s3Service, tokenService, userService,
} from '../services';
import { ActionTokenTypes, EmailActionEnum } from '../enums';
import { actionTokenRepository } from '../repositories';
import { ErrorHandler } from '../error';

class AuthController {
    public async registration(req: Request, res: Response, next:NextFunction):Promise<void> {
        try {
            const tokenPairData = await authService.registration(req.body);
            if (!tokenPairData) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }

            res.cookie(
                COOKIE.nameRefreshToken,
                tokenPairData.refreshToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );
            res.cookie(
                COOKIE.nameAccessToken,
                tokenPairData.accessToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );

            if (req.files?.avatar) {
                const avatar = req.files.avatar as UploadedFile;
                const uploadFile = await s3Service.uploadFile(avatar, 'user', tokenPairData.userId);
                console.log('upload file', uploadFile);
                console.log('location (where in S3)', uploadFile.Location);
            }

            const { email, firstName } = req.body as IUser;
            await emailService.sendMail(email, EmailActionEnum.REGISTRATION, {
                userName: firstName,
            });

            res.json(tokenPairData);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestUser, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameAccessToken);
        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteTokenPair(id);
        return res.json('OK');
    }

    public async login(req: IRequestUser, res: Response):Promise<Response<IRoleToken>> {
        const loginData = await authService.newTokens(req.user as IUser);
        const { firstName } = req.user as IUser;
        const { email } = req.body as IUser;

        await emailService.sendMail(email, EmailActionEnum.WELCOME, {
            userName: firstName,
        });

        res.cookie(
            COOKIE.nameAccessToken,
            loginData.accessToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        res.cookie(
            COOKIE.nameRefreshToken,
            loginData.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(loginData);
    }

    public async refresh(req: IRequestAuth, res: Response) {
        const refresh = await authService.newTokens(req.user as IUser);
        res.clearCookie(COOKIE.nameAccessToken);
        res.clearCookie(COOKIE.nameRefreshToken);

        res.cookie(
            COOKIE.nameRefreshToken,
            'a',
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(refresh);
    }

    async sendForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, firstName } = req.user as IUser;

            const token = tokenService.generateActionToken({ userId: id, userEmail: email });

            await actionTokenRepository.addToken({ actionToken: token, type: ActionTokenTypes.forgotPassword, userId: id });

            await emailService.sendMail(email, EmailActionEnum.FORGOT_PASSWORD, {
                token,
                userName: firstName,
            });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    async setPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUser;
            const actionToken = req.get(constants.AUTHORIZATION);

            await userService.updateUser(id, req.body.password);
            await actionTokenRepository.deleteToken({ actionToken });

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
