import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { User } from './usersEntity';
import { CommonFields } from './commonFields';
import { config } from '../configs';
import { IActionToken } from '../interfaces';

@Entity('actionTokens', { database: config.MYSQL_DATABASE_NAME })

export class ActionToken extends CommonFields implements IActionToken {
    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        token: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
