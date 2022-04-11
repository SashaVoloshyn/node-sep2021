import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { config } from '../configs';
import { CommonFields } from './commonFields';
import { User } from './usersEntity';
import { IToken } from '../interfaces';

@Entity('Tokens', { database: config.MYSQL_DATABASE_NAME })

export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
