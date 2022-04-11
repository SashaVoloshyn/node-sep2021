import { Response, NextFunction } from 'express';

import { IRequestAuth } from '../interfaces';

export const authorizationMiddleware = (req: IRequestAuth, res:Response, next:NextFunction) => {
    try {
        const authorization = req.get('Authorization');

        if (!authorization) {
            throw new Error('No authorization');
        }

        req.authorization = authorization;
        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};
