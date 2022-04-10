import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { IComment } from '../interfaces/comments.interface';
import { commentService } from '../services/comment/commentService';

class CommentController {
    public async getAll(_:any, res:Response):Promise<Response<IComment[]>> {
        const comments = await commentService.getAll();
        return res.json(comments);
    }

    public async getOne(req:Request, res:Response):Promise<Response<IComment | undefined>> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const comment = await commentService.getOne(id);
        return res.json(comment);
    }

    public async createOne(req:Request, res:Response):Promise<Response<IComment>> {
        const comment = await commentService.createOne(req.body);
        return res.json(comment);
    }

    public async getUserComments(req:Request, res:Response):Promise<Response<IComment[]>> {
        const { userId } = req.params;
        const authorId = Number(userId);
        const userComments = await commentService.getUserComment(authorId);
        return res.json(userComments);
    }

    public async updateComment(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { commentId } = req.params;
        const { text } = req.body;
        const id = Number(commentId);
        const update = await commentService.updateComment(id, text);
        return res.json(update);
    }

    public async remove(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const remove = await commentService.removeComment(id);
        return res.json(remove);
    }
}

export const commentController = new CommentController();
