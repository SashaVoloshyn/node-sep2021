import { NextFunction, Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { IUser } from '../interfaces';
import { userService } from '../services';
import { ErrorHandler } from '../error';

class UserController {
    public async getAll(_:any, res:Response, next: NextFunction):Promise<Response<IUser[]> | undefined> {
        try {
            const users = await userService.getAll();
            if (!users) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    public async getUsersPagination(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = 1, perPage = 20, ...other } = req.query;

            const usersPagination = await userService.getUsersPagination(other, +page, +perPage);

            res.json(usersPagination);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req:Request, res:Response, next: NextFunction):Promise<Response<IUser> | undefined> {
        try {
            const { userId } = req.params;
            const id = Number(userId);
            const user = await userService.getOne(id);
            if (!user) {
                next(new ErrorHandler('Not Found', 404));
                return;
            }
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    public async getByEmail(req:Request, res:Response):Promise<Response<IUser>> {
        const { email } = req.params;
        const user = await userService.getByEmail(email);
        return res.json(user);
    }

    public async getByPhone(req:Request, res:Response):Promise<Response<IUser>> {
        const { phone } = req.params;
        const user = await userService.getByPhone(phone);
        return res.json(user);
    }

    public async createOne(req:Request, res: Response):Promise<Response<IUser>> {
        const user = await userService.createOne(req.body);
        return res.json(user);
    }

    public async updateFields(req:Request, res:Response):Promise<Response<IUser>> {
        const { password, email, phone } = req.body;
        const { userId } = req.params;
        const id = Number(userId);
        const updateUser = await userService.updateFields(id, password, email, phone);
        return res.json(updateUser);
    }

    public async remove(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { userId } = req.params;

        const id = Number(userId);
        const remove = await userService.remove(id);
        return res.json(remove);
    }
}

export const userController = new UserController();
