import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IComment, IPaginationResponse } from '../../interfaces';
import { Comment } from '../../entity';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
    public async getAll():Promise<IComment[]> {
        const comments = await getManager()
            .getRepository(Comment)
            .createQueryBuilder()
            .getMany();
        return comments;
    }

    public async getCommentsPagination(
        searchObject: Partial<IComment> = {},
        limit: number = 40,
        page: number = 1,

    )
        :Promise<IPaginationResponse<IComment>> {
        const skip = limit * (page - 1);

        const [comments, itemCount] = await getManager().getRepository(Comment)
            .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemCount,
            data: comments,
        };
    }

    public async getOne(commentId:number):Promise<IComment | undefined> {
        const comment = await getManager()
            .getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.id = :commentId', { commentId })
            .getOne();
        return comment;
    }

    public async createOne(comment:IComment):Promise<IComment> {
        const newComment = await getManager()
            .getRepository(Comment)
            .save(comment);
        return newComment;
    }

    public async getUserComment(authorId:number):Promise<IComment[]> {
        const comments = await getManager()
            .getRepository(Comment)
            .createQueryBuilder('comments')
            .where('comments.authorId = :authorId', { authorId })
            .innerJoinAndSelect('comments.user', 'user')
            .innerJoinAndSelect('comments.post', 'post')
            .getMany();

        return comments;
    }

    public async updateComment(id:number, text:string):Promise<UpdateResult> {
        const comment = await getManager()
            .getRepository(Comment)
            .update({ id }, {
                text,
            });
        return comment;
    }

    public async removeComment(id:number):Promise<UpdateResult> {
        const remove = await getManager()
            .getRepository(Comment)
            .softDelete({ id });
        return remove;
    }
}

export const commentRepository = new CommentRepository();
