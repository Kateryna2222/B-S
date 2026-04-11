import { Router } from "express";
import { body } from "express-validator";

import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validationMiddlleware from "../middlewares/validationMiddlleware.js";

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post(
    '/', 
    body('title').isLength({ min: 2}),
    body('price').isNumeric(),
    body('categoryId').isInt(),
    authMiddleware, 
    validationMiddlleware,
    productController.createProduct,
);
router.put(
    '/:id', 
    body('title').isLength({ min: 2}),
    body('price').isNumeric(),
    body('categoryId').isInt(),
    authMiddleware, 
    productController.updateProduct
);
router.delete(
    '/:id', 
    authMiddleware, 
    productController.deleteProduct);

export default router;