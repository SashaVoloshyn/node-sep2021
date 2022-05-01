import 'reflect-metadata';
import express from 'express';
import fileUpload from 'express-fileupload';
import http from 'http';
import { createConnection } from 'typeorm';
import SocketIO from 'socket.io';
import mongoose from 'mongoose';

import { config } from './configs';
import { apiRouter } from './routes';
import { cronRun } from './cron';
import { socketController } from './controllers';

// @ts-ignore
global.rootDir = __dirname;

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket: any) => {
    console.log(socket.handshake.query.userId);
    console.log(socket.handshake.query.accessToken);

    socket.on('message:create', (data: any) => socketController.messageCreate(io, socket, data));

    socket.on('join_room', (data: any) => {
        socket.join(data.id);
        io.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined room ${data.id}` });
    });

    // ONE TO ONE
    // socket.emit(event, {});

    // SEND TO ALL ONLINE USERS (INCLUDE SENDER)
    // io.emit(event, {})

    // SEND TO ALL ONLINE USERS (AVOID SENDER)
    // socket.broadcast.emit(event, {})

    // socket.join(room_id)

    // TO ROOM AVOID SENDER
    // socket.broadcast.to(room_id).emit(event, {})

    // TO ROOM INCLUDE SENDER
    // io.to(room_id).emit(event, {})
});

mongoose.connect(`mongodb://localhost:${config.PORT_MONGO}/${config.MONGODB_NAME}`);

app.use(apiRouter);

const { PORT } = config;

server.listen(PORT, async () => {
    console.log(`SERVER HAS STARTED ON PORT: ${PORT}!!!!`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
            cronRun();
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
