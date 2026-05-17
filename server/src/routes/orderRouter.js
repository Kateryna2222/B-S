import { Router } from "express";
import orderController from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkIsBlockedMiddleware from "../middlewares/checkIsBlockedMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get('/:id', orderController.getOrder);
router.get('/', orderController.getOrders);
router.post('/', checkIsBlockedMiddleware(),  orderController.createOrder);

export default router;