import productRepository from "../../ropositories/productRepository.js";
import ApiError from "../../errors/ApiError.js";
import ProductDto from "../../DTO/products/productDto.js";
import ProductQueryDto from "../../DTO/other/productQueryDto.js";
import { handleProductQuery } from "../function/handleProductQuery.js";
import { pagination } from "../function/pagination.js";

class ProductService{

    async getOne(id, user){
        const product = await productRepository.getOne(id, user);
        if (!product) throw new ApiError(404, "Товар не знайдено");
        return product
    }

    async getAll(query){
        const qp = new ProductQueryDto(query);
        const params = handleProductQuery(qp);
        const result = await productRepository.getAll({...params});
        const products = result.rows;

        const pageData = pagination(qp, result);

        return {
            products,
            ...pageData
        }
    }
    

    async createProduct(data, id){
        const dto = new ProductDto(data);
        const product = await productRepository.create({...dto, userId: id});
        return product
    }

    async updateProduct(id, data){
        const product = await productRepository.findOne(id);
        if (!product) throw new ApiError(404, "Товар не знайдено");

        const dto = new ProductDto(data);
        Object.keys(dto).forEach(field => {
            if (data[field] !== undefined) {
                product[field] = data[field];
            }
        });

        const updatedProduct = await productRepository.save(product);
        return updatedProduct
    }

    async deleteProduct(id) {
        const product = await productRepository.findOne(id);
        if (!product) throw new ApiError(404, "Товар не знайдено");

        await productRepository.delete(product);
        return { message: "Товар видалено" };
    }

}

export default new ProductService();
