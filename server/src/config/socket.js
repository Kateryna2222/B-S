import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import tokenService from '../services/tokenService.js';
import chatService from '../services/chat/chatService.js';

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

        socket.on("leave_chat", (chatId) => {
            socket.leave(chatId);
        });

        socket.on("send_message", async (data) => {
            const message = await chatService.createMessage({
                chatId: data.chatId,
                senderId: socket.user.id,
                content: data.content,
                imageUrl: data.imageUrl,
            });

            io.to(data.chatId).emit("receive_message", message);
        });
        
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
}

export default initSocket;