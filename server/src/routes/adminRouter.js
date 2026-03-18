import { body } from "express-validator";
import { Router } from "express";

import adminController from "../controllers/adminController.js";
import validationMiddlleware from "../middlewares/validationMiddlleware.js";
import checkRoleMiddleware from "../middlewares/checkRoleMiddleware.js";

const router = Router();

router.use(checkRoleMiddleware('ADMIN'));

router.get('/users', adminController.getAllUsers);
router.patch('/user/:id/block', adminController.blockUser);
router.patch('/user/:id/unblock', adminController.unblockUser);
router.patch(
    '/user/:id/changerole', 
    body('role').customSanitizer(value => value?.toUpperCase()).isIn(['USER', 'ADMIN']),
    validationMiddlleware,
    adminController.changeUserRole);

export default router;