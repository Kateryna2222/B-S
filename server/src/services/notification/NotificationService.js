import notificationRepository from "../../ropositories/notificationRepository.js";
import userRepository from "../../ropositories/userRepository.js";
import ApiError from "../../errors/ApiError.js";

class NotificationService{
    async getNotifications(id, query){
        const user = await userRepository.findOne('id', id);
        if(!user) throw new ApiError(404, 'Користувача не знайдено');

        const cursor = query.cursor || null;
        const limit = Number(query.limit) || 10;
        const onlyUnread = query.onlyUnread === 'true';

        const notifications = await notificationRepository.getAllByUserId(id, cursor, limit, onlyUnread);
        return notifications
    }

    async createNotification(data){
        const notification = await notificationRepository.create(data);
        return notification
    }

    async markAsRead(id){
        const notification = await notificationRepository.markAsRead(id);
        return notification
    }
}

export default new NotificationService();