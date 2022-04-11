import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { IUser } from '../interfaces';
import { userService } from '../services';

class UserController {
    public async getAll(_:any, res:Response):Promise<Response<IUser[]>> {
        const users = await userService.getAll();
        return res.json(users);
    }

    public async getOne(req:Request, res:Response):Promise<Response<IUser>> {
        const { userId } = req.params;
        const id = Number(userId);
        const user = await userService.getOne(id);
        return res.json(user);
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
