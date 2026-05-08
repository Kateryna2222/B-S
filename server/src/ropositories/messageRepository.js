import Message from '../models/Message.js';
import User from '../models/User.js';
import { Op } from 'sequelize';

class MessageRepository {

    async create(data) {
        return await Message.create(data);
    }

    async findByChatId(chatId, cursor = null, limit = 30) {
        const where = { chatId };

        if (cursor) {
            where.createdAt = { [Op.lt]: cursor };
        }

        const messages = await Message.findAll({
            where,
            include: [{ model: User, as: 'sender', attributes: ['id', 'username'] }],
            order: [['createdAt', 'DESC']],
            limit
        });

        return messages.reverse();
    }

    async findById(id) {
        return await Message.findByPk(id);
    }

    async save(message) {
        return await message.save();
    }

}

export default new MessageRepository();