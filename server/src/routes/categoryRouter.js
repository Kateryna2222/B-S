import { Router } from "express";
import { body } from "express-validator";

import categoryControler from "../controllers/categoryControler.js";
import checkRoleMiddleware from "../middlewares/checkRoleMiddleware.js";
import validationMiddlleware from "../middlewares/validationMiddlleware.js";

const router = Router();

router.get('/', categoryControler.getCategories);
router.get('/:id', categoryControler.getCategory);
router.post(
    '/', 
    checkRoleMiddleware('ADMIN'), 
    body('name').isLength({ min: 2}),
    body('parent_id').optional().isInt(),
    validationMiddlleware,
    categoryControler.createCategory
);
router.put(
    '/:id', 
    checkRoleMiddleware('ADMIN'), 
    body('name').isLength({ min: 2}),
    body('parent_id').optional().isInt(),
    validationMiddlleware,
    categoryControler.updateCategory
);
router.delete('/:id', checkRoleMiddleware('ADMIN'), categoryControler.deleteCategory);

export default router;