import { Router } from "express";

import categoryControler from "../controllers/categoryControler.js";
import checkRoleMiddleware from "../middlewares/checkRoleMiddleware.js";

const router = Router();

router.get('/categories', categoryControler.getCategories);
router.get('/:id', categoryControler.getCategory);
router.get('/categories/:parent_id', categoryControler.getCategories);
router.post('/', checkRoleMiddleware('ADMIN'), categoryControler.careteCategory);
router.put('/:id', checkRoleMiddleware('ADMIN'), categoryControler.updateCategory);
router.delete('/:id', checkRoleMiddleware('ADMIN'), categoryControler.deleteCategory);

export default router;