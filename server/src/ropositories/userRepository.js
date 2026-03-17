import User from "../models/User.js";

class UserRepository{

    async findOne(field, value) {
        return await User.findOne({ where: { [field]: value } });
    }

    async create(data){
        return await User.create({...data});
    }

    async save(user){
        return await user.save();
    }

    async delete(user){
        return await user.destroy();
    }

}

export default new UserRepository();