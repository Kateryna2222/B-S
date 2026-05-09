import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import createFile from '../utils/createFile.js';
import { createFileSocket } from '../utils/createFile.js';
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

        socket.on("join_chat", async(chatId) => {
            socket.join(chatId);

            await chatService.readMessage({
                chatId,
                userId: socket.user.id
            });

            io.to(chatId).emit("messages_read", {
                chatId,
                userId: socket.user.id
            });
        });

        socket.on("leave_chat", (chatId) => {
            socket.leave(chatId);
        });

        socket.on("send_message", async (data) => {

            let fileName = null;
            if (data.image) {
                fileName = await createFileSocket({
                    buffer: data.image.buffer,
                    originalName: data.image.originalName
                });
            }

            const message = await chatService.createMessage({
                chatId: data.chatId,
                senderId: socket.user.id,
                content: data.content,
                imageUrl: fileName,
            });

            //Check shoud be mess read
            const room = io.sockets.adapter.rooms.get(data.chatId);
            const socketsInRoom = room ? [...room] : [];

            const usersInRoom = socketsInRoom
                .map(socketId => io.sockets.sockets.get(socketId)?.user?.id)
                .filter(id => id && id !== socket.user.id);

            if (usersInRoom.length > 0) {
                await chatService.readMessageForUsers({
                    chatId: data.chatId,
                    userIds: usersInRoom
                });
                message.isRead = true;
            }

            io.to(data.chatId).emit("receive_message", message);

            io.emit("chat_updated", {
                chatId: data.chatId,
                lastMessage: message
            });
        });
        
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
}

export default initSocket;