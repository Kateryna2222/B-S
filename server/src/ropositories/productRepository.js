import Product from "../models/Product.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import ProductImage from "../models/ProductImage.js";

const baseInclude = [
    { model: Category, as: 'category' },
    { 
        model: ProductImage, 
        as: 'images',
        attributes: ['id', 'image_url'] 
    },
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

    async create(data, options = {}){
        return await Product.create({...data}, options);
    }

    async save(product, options = {}){
        return await product.save(options);
    }

    async delete(product){
        return await product.destroy();
    }

}

export default new ProductRepository();