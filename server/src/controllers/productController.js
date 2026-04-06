import productService from "../services/Products/productService.js";
import productImageService from "../services/Products/productImageService.js";
import sequelize from "../config/database.js";

class ProductController{

    async getProduct(req, res){
        const { user } = req.query;
        const product = await productService.getOne(req.params.id, user);
        return res.status(200).json(product);
    }

    async getProducts(req, res){
        const products = await productService.getAll(req.query);
        return res.status(200).json(products);
    }


    async createProduct(req, res, next) {
        const t = await sequelize.transaction(); 
        try {
            const product = await productService.createProduct(
                req.body, 
                req.user.id, 
                { transaction: t } 
            );

            if (product && req.files?.images) {
                await productImageService.createImgs(
                    product.id,
                    req.files.images,
                    { transaction: t } 
                );
            }

            await t.commit(); 
            return res.status(200).json(product);
        } catch (err) {
            await t.rollback(); 
            next(err); 
        }
    }

    async updateProduct(req, res, next) {
        const t = await sequelize.transaction(); 
        try {
            const product = await productService.updateProduct(
                req.params.id, 
                req.body,
                { transaction: t } 
            );


            if (product && req.files?.images) {
                await productImageService.deleteImgs(product.id, { transaction: t });
                await productImageService.createImgs(
                    product.id,
                    req.files.images,
                    { transaction: t } 
                );
            }

            await t.commit(); 
            return res.status(200).json(product);
        } catch (err) {
            await t.rollback(); 
            next(err); 
        }
    }

    // async updateProduct(req, res){
    //     const product = await productService.updateProduct(req.params.id, req.body);
    //     return res.status(200).json(product);
    // }

    async deleteProduct(req, res){
        await productService.deleteProduct(req.params.id)
        return res.status(200).json({message: 'Товар видалено'})
    }

}

export default new ProductController();