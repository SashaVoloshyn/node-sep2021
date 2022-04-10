import { NextFunction, Response, Request } from 'express';

export const userFieldsFilledMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const {
            firstName, lastName, age, phone, email, password,
        } = req.body;

        if (!firstName || !lastName || !age || !phone || !email || !password) {
            throw new Error('probably not all fields are filled');
        }

        next();
    } catch (err) {
        res.status(400).end((err as Error).message);
    }
};
