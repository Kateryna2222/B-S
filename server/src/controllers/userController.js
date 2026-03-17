import userService from "../services/userService.js";

class UserController{

    async getUser(req, res){
        const user = await userService.getUser(req.params.id);
        return res.status(201).json({...user});
    }

    async updateUser(req, res){
        const user = await userService.updateUser(req.body);
        return res.status(200).json({...user});
    }

    async updateUserPassword(req, res){
        const user = await userService.updatePassword(req.params.id, req.body);
        return res.status(200).json({...user});
    }

    async deleteUser(req, res){
        await userService.deleteUser(req.params.id)
        return res.status(200).json({message: 'User was deleted'})
    }

}

export default new UserController();