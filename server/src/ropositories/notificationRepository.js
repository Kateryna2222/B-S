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
}

export default new NotificationRepository();