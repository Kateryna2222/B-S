import chatRepository from '../../ropositories/chatRepository.js';
import messageRepository from '../../ropositories/messageRepository.js';
import ApiError from '../../errors/ApiError.js';

class ChatService {

    async findOrCreateChat(userId, otherUserId) {
        let chat = await chatRepository.findExisting(userId, otherUserId);
        if (chat) return { chat, isNew: false };

        chat = await chatRepository.create(userId, otherUserId);
        return { chat, isNew: true };
    }

    async getUserChats(userId) {
        const chats = await chatRepository.findAllByUser(userId);
        return chats.map(chat => {
            const chatJson = chat.toJSON();
            const otherUser = chatJson.user1Id === userId ? chatJson.user2 : chatJson.user1;
            const lastMessage = chatJson.messages?.[0] || null;
            return { id: chatJson.id, otherUser, lastMessage, updatedAt: chatJson.updatedAt };
        });
    }

    async getMessages(chatId, userId, cursor, limit) {
        const chat = await chatRepository.findById(chatId);
        if (!chat) throw new ApiError(404, 'Чат не знайдено');
        if (chat.user1Id !== userId && chat.user2Id !== userId) throw new ApiError(403, 'Немає доступу');

        return await messageRepository.findByChatId(chatId, cursor, limit);
    }

    async readMessage({chatId, userId}){
        const chat = await chatRepository.findById(chatId);
        if (!chat) throw new ApiError(404, 'Чат не знайдено');

        return await messageRepository.makeRead({chatId, userId})
    }

    async readMessageForUsers({chatId, userIds}){
        const chat = await chatRepository.findById(chatId);
        if (!chat) throw new ApiError(404, 'Чат не знайдено');

        return await messageRepository.makeReadForUsersInRoom({chatId, userIds})
    }

    async createMessage({ chatId, senderId, content, imageUrl }) {
        const chat = await chatRepository.findById(chatId);
        if (!chat) throw new ApiError(404, 'Чат не знайдено');
        if (chat.user1Id !== senderId && chat.user2Id !== senderId) throw new ApiError(403, 'Немає доступу');
        if (!content && !imageUrl) throw new ApiError(400, 'Повідомлення порожнє');

        let messageType = 'text';
        if (imageUrl && content) messageType = 'mixed';
        else if (imageUrl) messageType = 'image';

        const message = await messageRepository.create({ chatId, senderId, content, imageUrl, messageType });

        await chat.update({ updatedAt: new Date() });

        return message;
    }
}

export default new ChatService();