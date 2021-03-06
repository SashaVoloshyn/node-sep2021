import { Request, Response } from 'express';

import { IRoleToken } from '../interfaces/token.interface';
import { authService } from '../services/auth/authService';
import { COOKIE } from '../constants/cookie';

class AuthController {
    public async registration(req: Request, res: Response):Promise<Response<IRoleToken>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(data);
    }
}

export const authController = new AuthController();
