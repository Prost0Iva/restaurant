import { Router } from 'express';
import * as SettingsController from '../controllers/settings.js';

const router = Router();

router.get('/', SettingsController.getAllSettings);

export default router;
