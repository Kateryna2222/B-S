import ProductImage from "../models/ProductImage.js";


class ProductImageRepository{

    async getOne(id) {
        return await ProductImage.findByPk(id);
    }

    async create(data, options = {}){
        return await ProductImage.create({...data}, options);
    }

    async deleteByProductId(productId, options = {}) {
        return await ProductImage.destroy({
            where: { productId },
            ...options
        });
    }

}

export default new ProductImageRepository();