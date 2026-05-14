import { Router } from "express";
import orderController from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get('/:id', orderController.getOrder);
router.get('/', orderController.getOrders);
router.post('/', orderController.createOrder);

export default router;