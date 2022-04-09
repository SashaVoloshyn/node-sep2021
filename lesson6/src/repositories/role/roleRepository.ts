import { EntityRepository, getManager, Repository } from 'typeorm';

import { Role } from '../../entity/roleEntity';
import { IUser } from '../../interfaces/users.interface';
import { IRole } from '../../interfaces/role.interface';

@EntityRepository(Role)
class RoleRepository extends Repository<Role> {
    public async createRole({ id }:IUser):Promise<IRole> {
        const role = await getManager()
            .getRepository(Role)
            .save({ userId: id });
        return role;
    }

    public async getRole({ id }:IUser):Promise<IRole | undefined> {
        const role = await getManager()
            .getRepository(Role)
            .findOne({ userId: id });
        return role;
    }
}

export const roleRepository = new RoleRepository();
