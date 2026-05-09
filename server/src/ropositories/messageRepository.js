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

    async makeRead({chatId, userId}){
        return await Message.update(
            { isRead: true },
            {
                where: {
                    chatId,
                    senderId: {
                        [Op.ne]: userId
                    },
                    isRead: false
                }
            }
        );
    }

    async makeReadForUsersInRoom({chatId, userIds}){
        return await Message.update(
            { isRead: true },
            {
                where: {
                    chatId,
                    senderId: {
                        [Op.notIn]: userIds
                    },
                    isRead: false
                }
            }
        );
    }

    async save(message) {
        return await message.save();
    }

}

export default new MessageRepository();