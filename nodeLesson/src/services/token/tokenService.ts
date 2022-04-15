import jwt from 'jsonwebtoken';
import { UpdateResult } from 'typeorm';

import { IRole, ITokenPair, ITokenRepository } from '../../interfaces';
import { config } from '../../configs';
import { tokenRepository } from '../../repositories';
import { constants } from '../../constants';

class TokenService {
    public async generateTokenPair(payload:IRole):Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(tokensPair:ITokenRepository):Promise<ITokenRepository | UpdateResult> {
        const { userId } = tokensPair;
        const tokensFromDB = await tokenRepository.findToken(userId);
        if (tokensFromDB) {
            tokensFromDB.refreshToken = tokensPair.refreshToken;
            tokensFromDB.accessToken = tokensPair.accessToken;
            return tokenRepository.updateToken(tokensFromDB);
        }
        return tokenRepository.saveToken(tokensPair);
    }

    public async deleteTokenPair(userId:number) {
        await tokenRepository.deleteUserTokenPair({ userId });
    }

    public async verifyTokens(token: string, type = constants.ACCESS): Promise<IRole> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (type === constants.REFRESH) {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(token, secretWord as string) as IRole;
    }

    public async findToken(userId: number):Promise<ITokenRepository | undefined> {
        return tokenRepository.findToken(userId);
    }
}

export const tokenService = new TokenService();
