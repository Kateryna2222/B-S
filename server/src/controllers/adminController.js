import adminService from "../services/adminService.js";

class AdminController{

    async getAllUsers(req, res){
        const users = await adminService.getAllUsers();
        return res.status(200).json({users});
    }

    async blockUser(req, res){
        const user = await adminService.blockUser(req.params.id);
        return res.status(200).json({user});
    }

    async unblockUser(req, res){
        const user = await adminService.unblockUser(req.params.id);
        return res.status(200).json({user});
    }

    async changeUserRole(req, res){
        const user = await adminService.changeUserRole(req.params.id, req.body.role);
        return res.status(200).json({user});
    }

}

export default new AdminController();