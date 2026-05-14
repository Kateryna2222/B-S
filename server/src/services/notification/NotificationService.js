import notificationRepository from "../../ropositories/notificationRepository.js";
import userRepository from "../../ropositories/userRepository.js";
import ApiError from "../../errors/ApiError.js";

class NotificationService{
    async getNotifications(id){
        const user = await userRepository.findOne('id', id);
        if(!user) throw new ApiError(404, 'Користувача не знайдено');

        const notifications = await notificationRepository.getAllByUserId(id);
        return notifications
    }

    async createNotification(data){
        const notification = await notificationRepository.create(data);
        return notification
    }
}

export default new NotificationService();