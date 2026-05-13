import notificationRepository from "../../ropositories/notificationRepository.js";
import userService from "../userService.js";
import ApiError from "../../errors/ApiError.js";

class NotificationService{
    async getNotifications(id){
        const user = await userService.getUser('id', id);
        if (!user) throw new ApiError(404, "User not found");

        const notifications = await notificationRepository.getAllByUserId(id);
        return notifications
    }

    async createNotification(data){
        const notification = await notificationRepository.create(data);
        return notification
    }
}

export default new NotificationService();