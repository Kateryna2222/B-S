import { Router } from "express";

import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import adminRouter from './adminRouter.js';
import categoryRouter from './categoryRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/category", categoryRouter);

export default router;