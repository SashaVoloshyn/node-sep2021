import { Response, NextFunction } from 'express';
import { IRequestUser } from '../interfaces';
import { userRepository } from '../repositories';

export const userExistsMiddleware = async (req:IRequestUser, res:Response, next:NextFunction) => {
    try {
        const { email } = req.body;
        const user = await userRepository.getOneByEmail(email);

        if (!user) {
            throw new Error('user already exists');
        }

        req.user = user;

        next();
    } catch (e) {
        if (e) {
            res.status(400).end((e as Error).message);
        }
    }
};
