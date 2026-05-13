import { Router } from "express";

import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import adminRouter from './adminRouter.js';
import categoryRouter from './categoryRouter.js';
import productRouter from './productRouter.js';
import favouriteRouter from './favouriteRouter.js';
import ratingRouter from './ratingRouter.js';
import chatRouter from './chatRouter.js';
import notificationRouter from './notificationRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/favourite", favouriteRouter);
router.use("/rating", ratingRouter);
router.use("/chat", chatRouter);
router.use("/notification", notificationRouter);

export default router;