import { getManager, Repository, UpdateResult } from 'typeorm';

import { Token } from '../../entity';
import { IToken, ITokenRepository } from '../../interfaces';

class TokenRepository extends Repository<Token> {
    public async saveToken(tokensPair:ITokenRepository):Promise<ITokenRepository> {
        const token = await getManager()
            .getRepository(Token)
            .save(tokensPair);
        return token;
    }

    public async updateToken(tokensPair: ITokenRepository):Promise<UpdateResult> {
        const { userId, accessToken, refreshToken } = tokensPair;
        const token = await getManager()
            .getRepository(Token)
            .update({ userId }, {
                accessToken,
                refreshToken,
            });
        return token;
    }

    public async findToken(userId:number):Promise<ITokenRepository | undefined> {
        const token = await getManager()
            .getRepository(Token)
            .findOne({ userId });
        return token;
    }

    public async deleteUserTokenPair(userId: Partial<IToken>): Promise<void> {
        await getManager().getRepository(Token).delete(userId);
    }
}

export const tokenRepository = new TokenRepository();
