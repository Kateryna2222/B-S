import { body } from "express-validator";
import { Router } from "express";

import authController from "../controllers/authController.js";
import validationMiddlleware from "../middlewares/validationMiddlleware.js";

const router = Router();

router.post(
    '/registration', 
    body('username').isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 32 }),
    body('phoneNumber').matches(/^\+\d{10,15}$/),
    body('role').customSanitizer(value => value?.toUpperCase()).isIn(['USER', 'ADMIN']),
    validationMiddlleware,
    authController.registration 
);
router.post(
    '/login', 
    body('email').notEmpty(),
    body('password').notEmpty(),
    validationMiddlleware,
    authController.login 
);
router.post('/logout', authController.logout );
router.get('/activate/:link', authController.activate );
router.get('/refresh', authController.refresh );

export default router;