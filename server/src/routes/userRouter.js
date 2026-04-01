import { body } from "express-validator";
import { Router } from "express";

import userController from "../controllers/userController.js";
import validationMiddlleware from "../middlewares/validationMiddlleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.put('/me/update', 
    authMiddleware,
    body('username').optional().isLength({ min: 2 }),
    body('phoneNumber').optional().matches(/^\+\d{10,15}$/),
    body('email').isEmail(),
    validationMiddlleware,
    userController.updateUser );

router.delete('/me/delete', authMiddleware, userController.deleteUser );

router.post('/recover', 
    body('email').isEmail(),
    validationMiddlleware,
    userController.sendMailForRecover );

router.put('/recover/password', 
    body('password').isLength({ min: 8, max: 32 }),
    validationMiddlleware,
    userController.recoverPassword );

export default router;
