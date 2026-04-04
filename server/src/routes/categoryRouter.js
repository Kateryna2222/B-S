import { Router } from "express";
import { body } from "express-validator";

import categoryControler from "../controllers/categoryControler.js";
import checkRoleMiddleware from "../middlewares/checkRoleMiddleware.js";
import validationMiddlleware from "../middlewares/validationMiddlleware.js";

const router = Router();

router.get('/all', categoryControler.getCategories);
router.get('/:id', categoryControler.getCategory);
router.get('/all/:parent_id', categoryControler.getCategories);
router.post(
    '/', 
    checkRoleMiddleware('ADMIN'), 
    body('name').isLength({ min: 2}),
    validationMiddlleware,
    categoryControler.createCategory
);
router.put(
    '/:id', 
    checkRoleMiddleware('ADMIN'), 
    body('name').isLength({ min: 2}),
    validationMiddlleware,
    categoryControler.updateCategory
);
router.delete('/:id', checkRoleMiddleware('ADMIN'), categoryControler.deleteCategory);

export default router;