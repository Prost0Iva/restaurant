import type { Request, Response } from 'express';
import Category from '../models/categories.js';

interface ConvertedCategory {
    _id?: object;
    name: string;
    description: string;
}

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        let convertedRes: Record<string, ConvertedCategory> = {};
        categories.forEach((m) => {
            convertedRes[m.key] = {
                _id: m._id,
                name: m.name,
                description: m.description
            };
        });
        res.json(convertedRes);
    } catch (error) {
        res.status(500).json({ message: 'Server error ', error });
    }
};
