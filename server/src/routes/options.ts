import { Router } from 'express';
import * as OptionsController from '../controllers/options.js';

const router = Router();

router.get('/', OptionsController.getAllOptions);

export default router;
