import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import { Op } from 'sequelize';

class ChatRepository {

    async findExisting(user1Id, user2Id) {
        const minId = Math.min(user1Id, user2Id);
        const maxId = Math.max(user1Id, user2Id);
        return await Chat.findOne({ where: { user1Id: minId, user2Id: maxId } });
    }

    async create(user1Id, user2Id) {
        const minId = Math.min(user1Id, user2Id);
        const maxId = Math.max(user1Id, user2Id);
        return await Chat.create({ user1Id: minId, user2Id: maxId });
    }

    async findAllByUser(userId) {
        return await Chat.findAll({
            where: { [Op.or]: [{ user1Id: userId }, { user2Id: userId }] },
            include: [
                { model: User, as: 'user1', attributes: ['id', 'username', 'avatar'] },
                { model: User, as: 'user2', attributes: ['id', 'username', 'avatar'] },
                {
                    model: Message,
                    as: 'messages',
                    limit: 1,
                    order: [['createdAt', 'DESC']],
                    required: false
                }
            ],
            order: [['updatedAt', 'DESC']]
        });
    }

    async findById(chatId) {
        return await Chat.findByPk(chatId);
    }

}

export default new ChatRepository();