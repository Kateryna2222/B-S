import orderService from "../services/order/OrderService.js";
import productService from "../services/Products/productService.js";
import { sendNotification } from "../utils/sendNotification.js";

import sequelize from "../config/database.js";

class OrderController{

    async getOrder(req, res){
        const order = await orderService.getOrder(req.params.id);
        return res.status(200).json(order);
    }

    async getOrders(req, res){
        const { id } = req.user; 
        const orders = await orderService.getAllOrders(id);
        return res.status(200).json(orders);
    }

    async createOrder(req, res, next) {
        const t = await sequelize.transaction(); 
        try {
            const order = await orderService.createOrder({
                ...req.body, 
                userId: req.user.id,
            }, { transaction: t });

            if (order) {
                await productService.updateProduct(
                    order.productId,
                    {'status': 'pending'},
                    { transaction: t } 
                );
            }
            await t.commit(); 

            await sendNotification({
                title: 'Нове замовлення',
                message: `Ваш товар було замовлено. ID: ${req.body.productId}`,
                userId: req.body.sellerId
            });

            return res.status(200).json(order);
        } catch (err) {
            await t.rollback(); 
            next(err); 
        }
    }

}

export default new OrderController();