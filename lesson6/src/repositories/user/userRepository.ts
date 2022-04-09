import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { User } from '../../entity/usersEntity';
import { IUser } from '../../interfaces/users.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    public async getAll():Promise<IUser[]> {
        const users = await getManager()
            .getRepository(User)
            .find();
        return users;
    }

    public async getOne(id:number): Promise<IUser | undefined> {
        const user = await getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
        return user;
    }

    public async getOneByEmail(email:string):Promise<IUser | undefined> {
        const userByEmail = await getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .andWhere('user.email = :email', { email })
            .getOne();
        return userByEmail;
    }

    public async getOneByPhone(phone:string):Promise<IUser | undefined> {
        const userByPhone = await getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .andWhere('user.phone = :phone', { phone })
            .getOne();
        return userByPhone;
    }

    public async createOne(user:IUser):Promise<IUser> {
        const newUser = await getManager()
            .getRepository(User)
            .save(user);
        return newUser;
    }

    public async removeById(id:number):Promise<UpdateResult> {
        const remove = await getManager()
            .getRepository(User)
            .softDelete({ id });
        return remove;
    }
}

export const userRepository = new UserRepository();
