import jwt from 'jsonwebtoken';
import { DeleteResult, UpdateResult } from 'typeorm';

import {
    IActionToken,
    IActionTokenRepository,
    IRole, ITokenPair, ITokenRepository, IUserPayload,
} from '../../interfaces';
import { config } from '../../configs';
import { actionTokenRepository, tokenRepository } from '../../repositories';
import { constants } from '../../constants';

class TokenService {
    public async generateTokenPair(payload: IRole): Promise<ITokenPair> {
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

    public async saveToken(tokensPair: ITokenRepository): Promise<ITokenRepository | UpdateResult> {
        const { userId } = tokensPair;
        const tokensFromDB = await tokenRepository.findToken(userId);
        if (tokensFromDB) {
            tokensFromDB.refreshToken = tokensPair.refreshToken;
            tokensFromDB.accessToken = tokensPair.accessToken;
            return tokenRepository.updateToken(tokensFromDB);
        }
        return tokenRepository.saveToken(tokensPair);
    }

    public async deleteTokenPair(userId: number) {
        await tokenRepository.deleteUserTokenPair({ userId });
    }

    public async verifyTokens(token: string, type = constants.ACCESS): Promise<IRole> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (type === constants.REFRESH) {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        if (type === constants.ACTION) {
            secretWord = config.SECRET_ACTION_KEY;
        }

        return jwt.verify(token, secretWord as string) as IRole;
    }

    public async findToken(userId: number): Promise<ITokenRepository | undefined> {
        return tokenRepository.findToken(userId);
    }

    public generateActionToken(payload: IUserPayload): String {
        return jwt.sign(payload, config.SECRET_ACTION_KEY as string, { expiresIn: config.EXPIRES_IN_ACTION });
    }

    public async saveActionToken(token: IActionTokenRepository): Promise<IActionToken> {
        return actionTokenRepository.addToken(token);
    }

    public async deleteActionToken(tokenData: Partial<IActionTokenRepository>): Promise<DeleteResult> {
        return actionTokenRepository.deleteToken(tokenData);
    }

    public async findActionToken(userId: Partial<IActionTokenRepository>): Promise<IActionToken | undefined> {
        return actionTokenRepository.findToken(userId);
    }
}
export const tokenService = new TokenService();
