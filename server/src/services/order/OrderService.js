import orderRepository from "../../ropositories/orderRepository.js";
import userRepository from "../../ropositories/userRepository.js";
import productRepository from "../../ropositories/productRepository.js";
import ApiError from "../../errors/ApiError.js";

class OrderService{

    async getAllOrders(id){
        const user = await userRepository.findOne("id", id);
        if (!user) throw new ApiError(404, "Користувача не знайдено");

        const orders = await orderRepository.getAll(id);
        return orders
    }

    async getOrder(id){
        const order = await orderRepository.findOne(id);
        if (!order) throw new ApiError(404, "Замовлення не знайдено");
        return order
    }

    async createOrder(data, options = {}){
        const user = await userRepository.findOne("id", data.userId);
        if (!user) throw new ApiError(404, "Користувача не знайдено");

        const product = await productRepository.findOne(data.productId);
        if (!product) throw new ApiError(404, "Товар не знайдено");
        if(product.status !== 'available') throw new ApiError(400, "Товар не доступний для замовлення");

        const order = await orderRepository.create({
            ...data, 
            priceAtPurchase: product.price,
            sellerId: product.userId
        }, options);
        return order
    }

}

export default new OrderService();
