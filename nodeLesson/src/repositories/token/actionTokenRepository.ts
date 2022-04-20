import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';

import { ActionToken } from '../../entity';
import { IActionToken, IActionTokenRepository } from '../../interfaces';

@EntityRepository(ActionToken)
class ActionTokenRepository extends Repository<ActionToken> {
    public async addToken(newToken: IActionTokenRepository): Promise<ActionToken> {
        const token = await getManager()
            .getRepository(ActionToken)
            .save(newToken);
        return token;
    }

    public async deleteToken(token: Partial<IActionTokenRepository>): Promise<DeleteResult> {
        const deleteResult = await getManager()
            .getRepository(ActionToken)
            .delete(token);
        return deleteResult;
    }

    public async findToken({ userId }: Partial<IActionTokenRepository>): Promise<IActionToken | undefined> {
        const findOne = await getManager()
            .getRepository(ActionToken)
            .createQueryBuilder('token')
            .where('token.userId = :userId', { userId })
            .getOne();
        return findOne;
    }
}

export const actionTokenRepository = new ActionTokenRepository();
