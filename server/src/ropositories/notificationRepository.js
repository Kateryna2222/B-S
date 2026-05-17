import Notification from "../models/Notification.js";

class NotificationRepository{
    async getAllByUserId(id) {
        return await Notification.findAll({ 
            where: { userId: id },
            order: [['createdAt', 'DESC']]
        });
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