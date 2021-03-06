import { UpdateResult } from 'typeorm';
import { IPost } from '../../interfaces/posts.interface';
import { postRepository } from '../../repositories/post/postRepository';

class PostService {
    public async getAll():Promise<IPost[]> {
        const posts = await postRepository.getAll();
        return posts;
    }

    public async getOne(id:number):Promise<IPost | undefined> {
        const post = await postRepository.getOneById(id);
        return post;
    }

    public async createOne(post:IPost):Promise<IPost> {
        const newPost = await postRepository.createOne(post);
        return newPost;
    }

    public async getUserPosts(id:number):Promise<IPost[]> {
        const posts = await postRepository.getUserPosts(id);
        return posts;
    }

    public async updatePost(id:number, title:string, text: string):Promise<UpdateResult> {
        const patch = await postRepository.updatePost(id, title, text);
        return patch;
    }

    public async removeOne(id:number):Promise<UpdateResult> {
        const remove = await postRepository.removeById(id);
        return remove;
    }
}

export const postService = new PostService();
