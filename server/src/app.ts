import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.js';
import marketRoutes from './routes/markets.js';
import categoryRoutes from './routes/categories.js';
import settingRoutes from './routes/settings.js';
import optionRoutes from './routes/options.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/menu', productRoutes);
app.use('/api/markets', marketRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/options', optionRoutes);

export default app;
