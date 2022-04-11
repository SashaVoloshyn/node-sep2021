import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

import { config } from './configs';
import { apiRouter } from './routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(apiRouter);

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`SERVER HAS STARTED ON PORT: ${PORT}!!!!`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
