import adminService from "../services/adminService.js";
import notificationService from "../services/notification/NotificationService.js";
import { sendNotification } from "../utils/sendNotification.js";

class AdminController{

    async getAllUsers(req, res){
        const users = await adminService.getAllUsers(req.query);
        return res.status(200).json(users);
    }

    async blockUser(req, res){
        const user = await adminService.blockUser(req.params.id);

        sendNotification({
            title: 'Акаунт заблоковано', 
            message: 'Ваш акакнт було заблоковано. Тепер Ви не можете створювати оголошення.',
            userId: req.params.id
        })

        return res.status(200).json({user});
    }

    async unblockUser(req, res){
        const user = await adminService.unblockUser(req.params.id);
        
        sendNotification({
            title: 'Акаунт розблоковано', 
            message: 'Ваш акакнт було розблоковано. Доступ відновлено.',
            userId: req.params.id
        })

        return res.status(200).json({user});
    }

    async changeUserRole(req, res){
        const user = await adminService.changeUserRole(req.params.id, req.body.role);
        return res.status(200).json({user});
    }

}

export default new AdminController();