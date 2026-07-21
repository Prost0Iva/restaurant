import { Router } from 'express';
import * as ProductController from '../controllers/products.js';

const router = Router();

router.get('/', ProductController.getAllProducts);

export default router;
