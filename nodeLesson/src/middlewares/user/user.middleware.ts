import { NextFunction, Response } from 'express';

import { IRequestUser, IUser } from '../../interfaces';
import {
    authLoginSchema, authSchema, paramsSchema, userPatchSchema,
} from '../../helpers';
import { ErrorHandler } from '../../error';
import { userService } from '../../services';
import { userRepository } from '../../repositories';

class UserMiddleware {
    public async validatorRegistration(req:IRequestUser, _:Response, next:NextFunction): Promise<void> {
        try {
            const { error, value } = authSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async updateFields(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const { userId } = req.params;
            const { error: errParams, value: params } = paramsSchema.validate({ userId });

            if (errParams) {
                next(new ErrorHandler(errParams.message));
                return;
            }

            const { error, value } = userPatchSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.body = { password: value.currentPassword, newPassword: value.newPassword, userId: params.userId };
            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserByParams(req: IRequestUser, _: Response, next: NextFunction) {
        try {
            const { userId } = req.body;

            const actualUser = await userService.getOne(userId);

            if (!actualUser) {
                next(new ErrorHandler('Impossible patching because data is invalid'));
                return;
            }

            const { email, phone } = req.user as IUser;

            req.user = { ...actualUser, email, phone };

            next();
        } catch (e) {
            next(e);
        }
    }

    public validatorLogin(req: IRequestUser, _: Response, next: NextFunction): void {
        try {
            const { error, value } = authLoginSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserByEmail(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const { email } = req.user as IUser;
            const user = await userRepository.getOneByEmail(email);

            if (!user) {
                next(new ErrorHandler('data invalid'));
                return;
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserByPhone(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const { phone } = req.user as IUser;
            const user = await userRepository.getOneByPhone(phone);

            if (!user) {
                next(new ErrorHandler('data invalid'));
                return;
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isCurrentPassword(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const user = req.user as IUser;
            const { password } = req.body;

            const checkedPassword = await userService.checkPassword(password, user.password);

            if (!checkedPassword) {
                next(new ErrorHandler('Wrong email or password'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
