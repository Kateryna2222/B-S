import { Router } from "express";

import favouriteController from "../controllers/favouriteController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = Router();

router.use(authMiddleware);

router.get(
    '/', 
    favouriteController.getProducts);
router.post(
    '/:id', 
    favouriteController.addProduct,
);
router.delete(
    '/:id', 
    favouriteController.deleteProduct);

export default router;