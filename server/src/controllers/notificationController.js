import notificationService from "../services/notification/NotificationService.js";

class NotificationController{

    async getNotifications(req, res){
        const { id } = req.user; 
        const notifications = await notificationService.getNotifications(id, req.query);
        return res.status(200).json(notifications);
    }

    async markAsRead(req, res){
        const { id } = req.user; 
        const notifications = await notificationService.markAsRead(id);
        return res.status(200).json(notifications);
    }
    
}

export default new NotificationController();