import chatService from '../services/chat/chatService.js';

class ChatController {

    async startChat(req, res) {
        const { otherUserId } = req.body;
        const { chat, isNew } = await chatService.findOrCreateChat(req.user.id, Number(otherUserId));
        return res.status(isNew ? 201 : 200).json({ chatId: chat.id, isNew });
    }

    async getChats(req, res) {
        const chats = await chatService.getUserChats(req.user.id);
        return res.status(200).json(chats);
    }

    async getMessages(req, res) {
        const { chatId } = req.params;
        const { cursor, limit = 30 } = req.query;
        const messages = await chatService.getMessages(chatId, req.user.id, cursor, Number(limit));
        return res.status(200).json(messages);
    }

    async sendMessage(req, res) {
        const { chatId } = req.params;
        const { content } = req.body;
        const imageUrl = req.file?.path || null;
        const message = await chatService.createMessage({ chatId, senderId: req.user.id, content, imageUrl });
        return res.status(201).json(message);
    }

}

export default new ChatController();