import Product from "../models/Product.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

const baseInclude = [
    { model: Category, as: 'category' },
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

    async getOne(id, user) {
        return await Product.findByPk(id, {
            include: [
                ...baseInclude,
                ...(user ? userInclude : []),
            ]
        });
    }

    async getAll(query) {
        return await Product.findAndCountAll({
            ...query,
            distinct: true
        });
    }

    async create(data){
        return await Product.create({...data});
    }

    async save(product){
        return await product.save();
    }

    async delete(product){
        return await product.destroy();
    }

}

export default new ProductRepository();