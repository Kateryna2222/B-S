import { body } from "express-validator";
import { Router } from "express";

import userController from "../controllers/userController.js";
import validationMiddlleware from "../middlewares/validationMiddlleware.js";

const router = Router();

router.put('/me/:id', 
    body('username').optional().isLength({ min: 2 }),
    body('oldPassword').optional().isLength({ min: 8, max: 32 }),
    body('newPassword').optional().isLength({ min: 8, max: 32 }),
    body('phoneNumber').optional().matches(/^\+\d{10,15}$/),
    validationMiddlleware,
    userController.updateUser );

router.delete('/me', userController.deleteUser );

router.post('/recover', 
    body('email').isEmail(),
    validationMiddlleware,
    userController.sendMailForRecover );

router.put('/recover/password', 
    body('password').isLength({ min: 8, max: 32 }),
    validationMiddlleware,
    userController.recoverPassword );

export default router;
