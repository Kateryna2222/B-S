import Order from "../models/Order.js";

class OrderRepository{

    async findOne(id) {
        return await Order.findByPk(id);
    }

    async getAll(id) {
        return await Order.findAll({ where: { 'userId': id } });
    }

    async create(data, options = {}){
        return await Order.create(data, options);
    }

}

export default new OrderRepository();