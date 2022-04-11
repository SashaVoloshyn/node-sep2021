import { Request, Response, NextFunction } from 'express';

export const userTypeLoginMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, password } = req.body;

        if (typeof email !== 'string' || typeof password !== 'string') {
            throw new Error('wrong data');
        }

        next();
    } catch (e) {
        res.json({
            status: 400,
            err: (e as Error).message,
        });
    }
};
