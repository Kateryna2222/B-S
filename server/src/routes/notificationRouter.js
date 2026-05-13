import { Router } from "express";
import notificationController from "../controllers/notificationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get('/', notificationController.getNotifications);
router.post('/', notificationController.createNotification);

export default router;