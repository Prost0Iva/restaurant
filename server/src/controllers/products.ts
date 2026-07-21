import type { Request, Response } from 'express';
import Product from '../models/products.js';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error ', error });
    }
};
