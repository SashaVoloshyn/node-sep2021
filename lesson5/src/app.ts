import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { Users } from './entity/usersEntity';

const app = express();
app.get('/users', async (req: Request, res: Response) => {
    const users = await getManager().getRepository(Users).find();
    res.json(users);
});

app.listen(5500, async () => {
    console.log('Server has started  on port 5500!!!!!!!!!!!!!!!!!!');

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
