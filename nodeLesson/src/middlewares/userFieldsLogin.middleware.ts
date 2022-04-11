import { NextFunction, Response, Request } from 'express';

export const userFieldsLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('wrong email or password');
        }

        next();
    } catch (e) {
        res.json({
            status: 400,
            error: (e as Error).message,
        });
    }
};
