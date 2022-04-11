import { UpdateResult } from 'typeorm';

import { IComment } from '../../interfaces';
import { commentRepository } from '../../repositories/comment/commentRepository';

class CommentService {
    public async getAll():Promise<IComment[]> {
        const comments = await commentRepository.getAll();
        return comments;
    }

    public async getOne(id:number):Promise<IComment | undefined> {
        const comment = await commentRepository.getOne(id);
        return comment;
    }

    public async createOne(comment:IComment):Promise<IComment> {
        const newComment = await commentRepository.createOne(comment);
        return newComment;
    }

    public async getUserComment(authorId:number):Promise<IComment[]> {
        const comments = await commentRepository.getUserComment(authorId);
        return comments;
    }

    public async updateComment(id:number, text: string):Promise<UpdateResult> {
        const comment = await commentRepository.updateComment(id, text);
        return comment;
    }

    public async removeComment(id:number):Promise<UpdateResult> {
        const remove = await commentRepository.removeComment(id);
        return remove;
    }
}

export const commentService = new CommentService();
