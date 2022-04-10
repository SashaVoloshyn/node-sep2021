import { Request, Response, NextFunction } from 'express';

import { userRepository } from '../repositories/user/userRepository';

const userUniqueValueFieldsMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, phone } = req.body;
        const userPhone = await userRepository.getOneByPhone(phone);
        const userEmail = await userRepository.getOneByEmail(email);
        if (userEmail || userPhone) {
            throw new Error('patch is impossible, some data is already used by other user or data is invalid');
        }
        next();
    } catch (err) {
        res.status(400).end((err as Error).message);
    }
};

export { userUniqueValueFieldsMiddleware };
