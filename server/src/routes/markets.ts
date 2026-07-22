import { Router } from 'express';
import * as MarketsController from '../controllers/markets.js';

const router = Router();

router.get('/', MarketsController.getAllMarkets);

export default router;
