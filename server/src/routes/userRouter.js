import { body } from "express-validator";
import { Router } from "express";

import userController from "../controllers/userController.js";
import validationMiddlleware from "../middlewares/validationMiddlleware.js";

const router = Router();

router.get('/me', userController.getUser );
router.put('/me', userController.updateUser );
router.put('/me/password', userController.updateUserPassword );
router.delete('/me', userController.deleteUser );

export default router;