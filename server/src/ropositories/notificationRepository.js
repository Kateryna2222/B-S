import Notification from "../models/Notification.js";
import { Op } from "sequelize";

class NotificationRepository{
    async getAllByUserId(id, cursor, limit = 10, onlyUnread = false) {

        const where = {
            userId: id,
            ...(onlyUnread && { isRead: false })
        };

        if (cursor) {
            where.createdAt = {
                [Op.lt]: new Date(cursor)
            };
        }

        const notifications = await Notification.findAll({ 
            where,
            order: [
                ['createdAt', 'DESC'],
                ['id', 'DESC']
            ],
            limit
        });

        const nextCursor = notifications.length > 0
            ? notifications[notifications.length - 1].createdAt
            : null;

        return {
            notifications,
            nextCursor,
            hasMore: notifications.length === limit
        };
    }

    async create(data) {
        return await Notification.create(data);
    }

    async markAsRead(id) {
        return await Notification.update(
            { isRead: true },
            { where: { userId: id } }
        );
    }
}

export default new NotificationRepository();