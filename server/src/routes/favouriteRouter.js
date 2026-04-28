import { Router } from "express";

import favouriteController from "../controllers/favouriteController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = Router();

router.get(
    '/', 
    authMiddleware,
    favouriteController.getProducts);
router.post(
    '/:id', 
    authMiddleware, 
    favouriteController.addProduct,
);
router.delete(
    '/:id', 
    authMiddleware, 
    favouriteController.deleteProduct);

export default router;