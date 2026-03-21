import userService from "../services/userService.js";

class UserController{

    async updateUser(req, res){
        const user = await userService.updateUser(req.params.id, req.body);
        return res.status(200).json({...user});
    }

    async sendMailForRecover(req, res){
        const response = await userService.sendMailForRecover(req.body);
        return res.status(200).json(response);
    }

    async recoverPassword(req, res){
        const response = await userService.recoverPassword(req.body);
        return res.status(200).json(response);
    }

    async deleteUser(req, res){
        await userService.deleteUser(req.params.id)
        return res.status(200).json({message: 'User was deleted'})
    }

}

export default new UserController();