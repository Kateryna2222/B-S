import Product from "../models/Product.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

const baseInclude = [
    { model: Category, as: 'category' }
]

const userInclude = [
    { 
        model: User, 
        as: 'user',
        attributes: ['id', 'username', 'avatar', 'phoneNumber'] 
    }
]

class ProductRepository{

    async findOne(id) {
        return await Product.findByPk(id);
    }

    async getOne(id) {
        return await Product.findByPk(id, {...baseInclude});
    }

    async getOneWithUser(id) {
        return await Product.findByPk(id, {include: [...baseInclude, ...userInclude]});
    }

    async getAllWithUser(id) {
        return await Product.findAll({
            where: {userId: id}, 
            include: [...baseInclude, ...userInclude]
        });
    }

    async getAll() {
        return await Product.findAll({include: [...baseInclude]});
    }

    async create(product){
        return await product.create({...data});
    }

    async save(product){
        return await product.save();
    }

    async delete(product){
        return await product.destroy();
    }

}

export default new ProductRepository();