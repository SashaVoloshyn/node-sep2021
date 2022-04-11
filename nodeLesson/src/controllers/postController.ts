import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { IPost } from '../interfaces';
import { postService } from '../services';

class PostController {
    public async getAll(_: any, res:Response):Promise<Response<IPost[]>> {
        const posts = await postService.getAll();
        return res.json(posts);
    }

    public async getOne(req:Request, res:Response):Promise<Response<IPost>> {
        const { postId } = req.params;
        const id = Number(postId);
        const post = await postService.getOne(id);
        return res.json(post);
    }

    public async createOne(req:Request, res:Response):Promise<Response<IPost>> {
        const post = await postService.createOne(req.body);
        return res.json(post);
    }

    public async getUserPosts(req:Request, res:Response):Promise<Response<IPost[]>> {
        const { userId } = req.params;
        const id = Number(userId);
        const posts = await postService.getUserPosts(id);
        return res.json(posts);
    }

    public async updatePost(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { text } = req.body;
        const { title } = req.body;
        const { postId } = req.params;
        const id = Number(postId);
        const patch = await postService.updatePost(id, title, text);
        return res.json(patch);
    }

    public async removeOne(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { postId } = req.params;
        const id = Number(postId);
        const remove = await postService.removeOne(id);
        return res.json(remove);
    }
}

export const postController = new PostController();
