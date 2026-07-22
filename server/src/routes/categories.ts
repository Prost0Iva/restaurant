import { Router } from 'express';
import * as CategoriesController from '../controllers/categories.js';

const router = Router();

router.get('/', CategoriesController.getAllCategories);

export default router;
