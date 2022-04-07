import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';

import { User } from './entity/usersEntity';
import { Post } from './entity/postsEntity';
import { Comment } from './entity/commentsEntity';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    console.log(users);
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        const createdUser = await getManager().getRepository(User).save(req.body);
        res.json(createdUser);
    } catch (err) {
        console.log(err);
    }
});

app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(createdUser);
});

app.delete('/users/:id', async (req, res) => {
    const createdUser = await getManager()
        .getRepository(User)
        .softDelete({ id: Number(req.params.id) });
    res.json(createdUser);
});

app.post('/posts', async (req: Request, res: Response) => {
    try {
        const postCreate = await getManager().getRepository(Post).save(req.body);
        res.json(postCreate);
    } catch (err) {
        console.log(err);
    }
});

app.get('/posts/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userPost = await getManager().getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: +userId })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
        res.json(userPost);
    } catch (err) {
        console.log(err);
    }
});

app.put('/posts/:postId', async (req, res) => {
    try {
        const { title, text } = req.body;
        const { postId } = req.params;
        const updatedPost = await getManager()
            .getRepository(Post)
            .update({ id: Number(postId) }, { title, text });
        res.json(updatedPost);
    } catch (err) {
        console.log(err);
    }
});

app.get('/comments', async (req, res) => {
    try {
        const createdComment = await getManager().getRepository(Comment).find();
        res.json(createdComment);
    } catch (e) {
        console.log(e);
    }
});

app.get('/comments/:authorId', async (req:Request, res:Response) => {
    try {
        console.log(req.params);
        const { authorId } = req.params;
        const id = Number(authorId);
        const commentsUser = await getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .where(`comment.authorId = ${id}`)
            .getMany();
        res.json(commentsUser);
    } catch (err) {
        console.log(err);
    }
});

app.listen(3442, async () => {
    console.log('Server has started  on port 3442!!!!!!!!!!!!!!!!!!');

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
