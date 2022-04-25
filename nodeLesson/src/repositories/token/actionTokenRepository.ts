import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';

import { ActionToken } from '../../entity';
import { IActionToken, IActionTokenToSave } from '../../interfaces';

@EntityRepository(ActionToken)
class ActionTokenRepository extends Repository<ActionToken> {
    public async addToken(newToken: IActionTokenToSave): Promise<ActionToken> {
        const token = await getManager()
            .getRepository(ActionToken)
            .save(newToken);
        return token;
    }

    public async deleteToken(token: Partial<IActionToken>): Promise<DeleteResult> {
        const deleteResult = await getManager()
            .getRepository(ActionToken)
            .delete(token);
        return deleteResult;
    }

    async findByParams(filterObject: Partial<IActionToken>): Promise<IActionToken | undefined> {
        return getManager().getRepository(ActionToken).findOne(filterObject);
    }
}

export const actionTokenRepository = new ActionTokenRepository();
