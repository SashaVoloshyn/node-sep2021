import { Request, Response, NextFunction } from 'express';

export const userPatchFieldsMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const { password, email, phone } = req.body;

        if (!password || !email || !phone) {
            throw new Error('probably not all fields are filled');
        }
        next();
    } catch (err) {
        res.status(400).end((err as Error).message);
    }
};
