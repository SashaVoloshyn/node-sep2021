import { getManager, Repository, UpdateResult } from 'typeorm';

import { Token } from '../../entity';
import { IRefreshToken } from '../../interfaces';

class TokenRepository extends Repository<Token> {
    public async saveToken(refreshToken:IRefreshToken):Promise<IRefreshToken> {
        const token = await getManager()
            .getRepository(Token)
            .save(refreshToken);
        return token;
    }

    public async updateToken(tokenRefresh: IRefreshToken):Promise<UpdateResult> {
        const { userId, refreshToken } = tokenRefresh;
        const token = await getManager()
            .getRepository(Token)
            .update({ userId }, {
                refreshToken,
            });
        return token;
    }

    public async findToken(userId:number):Promise<IRefreshToken | undefined> {
        const token = await getManager()
            .getRepository(Token)
            .findOne({ userId });
        return token;
    }
}

export const tokenRepository = new TokenRepository();
