import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import tokenService from '../services/tokenService.js';


function initSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        },
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error('Unauthorized'));

        const userData = tokenService.validateAccessToken(token);
        if (!userData) return next(new Error('Unauthorized'));

        socket.user = userData;
        next();
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join_chat", (chatId) => {
          socket.join(chatId);
        });

        socket.on("send_message", (data) => {
          io.to(data.chatId).emit("receive_message", data);
        });

        socket.on("disconnect", () => {
          console.log("User disconnected:", socket.id);
        });
    });

    return io;
}

export default initSocket;