import Favourite from "../models/Favourite.js";
import Product from "../models/Product.js";
import ProductImage from "../models/ProductImage.js";


class FavouriteRepository{

    async findAll(userId) {
        return await Product.findAll({
            include: [
                {
                    model: Favourite,
                    where: { userId },
                    attributes: []
                },
                { 
                    model: ProductImage, 
                    as: 'images',
                    attributes: ['id', 'image_url'] 
                }
            ]
        });
    }

    async add({userId, productId}) {
        const existing = await Favourite.findOne({
            where: { userId, productId }
        });
        if (existing) return existing;

        await Favourite.create({ userId, productId });

        return await Product.findByPk(productId, {
            include: [
                { 
                    model: ProductImage, 
                    as: 'images',
                    attributes: ['id', 'image_url'] 
                }
            ]
        });
    }

    async delete({userId, productId}) {
        const id = Number(productId);

        await Favourite.destroy({
            where: { userId, productId }
        });

        return { productId: id };
    }

}

export default new FavouriteRepository();