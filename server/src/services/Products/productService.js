import productRepository from "../../ropositories/productRepository.js";
import userRepository from "../../ropositories/userRepository.js";
import ApiError from "../../errors/ApiError.js";
import ProductDto from "../../DTO/products/productDto.js";

class ProductService{

    async getOne(id){
        const product = await productRepository.getOne(id);
        if (!product) throw new ApiError(404, "Товар не знайдено");
        return product
    }

    async getAll(){
        const product = await productRepository.getAll();
        return product
    }

    async getOneWithUser(id){
        const user = await userRepository.findOne('id', id);
        if(!user) throw new ApiError(404, "Користувача не знайдено");

        const product = await productRepository.getOneWithUser(id);
        if (!product) throw new ApiError(404, "Товар не знайдено");
        return product
    }

    async getAllWithUser(id){
        const user = await userRepository.findOne('id', id);
        if(!user) throw new ApiError(404, "Користувача не знайдено");

        const products = await productRepository.getAllWithUser(id);
        return products
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
