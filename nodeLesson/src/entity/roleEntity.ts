import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { IRole } from '../interfaces';
import { CommonFields } from './commonFields';
import { config } from '../configs';
import { User } from './usersEntity';

@Entity('Role', { database: config.MYSQL_DATABASE_NAME })

export class Role extends CommonFields implements IRole {
    @Column({
        type: 'varchar',
        width: 10,
        default: 'user',
        nullable: false,
    })
        role:string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
