import { Router } from "express";
import { body } from "express-validator";

import ratingController from "../controllers/ratingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validationMiddlleware from "../middlewares/validationMiddlleware.js";


const router = Router();

router.get('/:sellerId', ratingController.getRating);
router.put(
    '/:sellerId', 
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
    authMiddleware, 
    validationMiddlleware,
    ratingController.setRating,
);

export default router;