import bcrypt from 'bcrypt';

import { UpdateResult } from 'typeorm';

import { IUser } from '../../interfaces';
import { userRepository } from '../../repositories/user/userRepository';
import { config } from '../../configs';

class UserService {
    public async getAll():Promise<IUser[]> {
        const users = await userRepository.getAll();
        return users;
    }

    public async getOne(id:number): Promise<IUser | undefined> {
        const user = await userRepository.getOne(id);
        return user;
    }

    public async createOne(user:IUser):Promise<IUser> {
        const { password } = user;
        const passwordHashed = await this._hashPassword(password);
        const data = { ...user, password: passwordHashed };
        const createUser = await userRepository.createOne(data);
        return createUser;
    }

    public async remove(id:number):Promise<UpdateResult> {
        const remove = await userRepository.removeById(id);
        return remove;
    }

    public async getByEmail(email:string):Promise<IUser | undefined> {
        const user = await userRepository.getOneByEmail(email);
        return user;
    }

    public async updateFields(id:number, password:string, email:string, phone:string)
        :Promise<UpdateResult> {
        const passwordHashed = await this._hashPassword(password);
        const update = await userRepository.updateFields(id, passwordHashed, email, phone);
        return update;
    }

    public async getByPhone(phone:string):Promise<IUser | undefined> {
        const user = await userRepository.getOneByPhone(phone);
        return user;
    }

    public async checkPassword(password: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashPassword);
    }

    private async _hashPassword(password:string):Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();
