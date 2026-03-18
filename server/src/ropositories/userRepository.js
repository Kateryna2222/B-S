import User from "../models/User.js";

class UserRepository{

    async findOne(field, value) {
        return await User.findOne({ where: { [field]: value } });
    }

    async findAll() {
        return await User.findAll();
    }

    async create(data){
        return await User.create({...data});
    }

    async save(user){
        return await user.save();
    }

    async update(user, data) {
        Object.assign(user, data);
        return await user.save();
    }

    async delete(user){
        return await user.destroy();
    }

}

export default new UserRepository();