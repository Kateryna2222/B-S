import { Router } from "express";
import chatController from "../controllers/chatController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post('/start', chatController.startChat);
router.get('/', chatController.getChats);
router.get('/:chatId/messages', chatController.getMessages);

export default router;