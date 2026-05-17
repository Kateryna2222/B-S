import { getIO } from "../config/socket.js";
import notificationService from "../services/notification/NotificationService.js";

export const sendNotification = async({title, message, userId}) => {
    const notification = await notificationService.createNotification({
        title,
        message,
        userId
    });
    const io = getIO();
    io.to(`user_${userId}`).emit("new_notification", notification);
}