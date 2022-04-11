import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { Post } from '../../entity';
import { IPost } from '../../interfaces';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
    public async getAll():Promise<IPost[]> {
        const posts = await getManager()
            .getRepository(Post)
            .createQueryBuilder('posts')
            .getMany();
        return posts;
    }

    public async getOneById(id:number):Promise<IPost | undefined> {
        const post = await getManager()
            .getRepository(Post)
            .createQueryBuilder('post')
            .where('post.id = :id', { id })
            .getOne();
        return post;
    }

    public async createOne(post:IPost):Promise<IPost> {
        const newPost = await getManager()
            .getRepository(Post)
            .save(post);
        return newPost;
    }

    public async getUserPosts(userId:number):Promise<IPost[]> {
        const posts = await getManager()
            .getRepository(Post)
            .createQueryBuilder('posts')
            .where('posts.userId = :userId', { userId })
            .getMany();
        return posts;
    }

    public async updatePost(id:number, title:string, text:string):Promise<UpdateResult> {
        const newPost = await getManager()
            .getRepository(Post)
            .update({ id }, {
                title,
                text,
            });
        return newPost;
    }

    public async removeById(id:number):Promise<UpdateResult> {
        const remove = await getManager()
            .getRepository(Post)
            .softDelete({ id });
        return remove;
    }
}

export const postRepository = new PostRepository();
