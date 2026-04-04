import { Router } from "express";
import { body } from "express-validator";

import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validationMiddlleware from "../middlewares/validationMiddlleware.js";

const router = Router();

router.get('/:id', productController.getProduct);
router.get('/all', productController.getProducts);
router.post(
    '/', 
    authMiddleware, 
    productController.createProduct
);
router.put(
    '/:id', 
    authMiddleware, 
    productController.updateProduct
);
router.delete('/:id', authMiddleware, productController.deleteProduct);

export default router;