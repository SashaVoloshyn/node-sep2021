import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './usersEntity';
import { Comment } from './commentsEntity';
import { IPost } from '../interfaces';
import { config } from '../configs';

@Entity('Posts', { database: config.MYSQL_DATABASE_NAME })
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToMany(() => Comment, (comment) => comment.post)
        comments: Comment[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: User;
}
