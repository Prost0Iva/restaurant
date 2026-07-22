import type { Request, Response } from 'express';
import Option from '../models/options.js';

interface ConvertedOption {
    _id?: object;
    name: string;
    description: string;
    price: number;
    image: string;
}

export const getAllOptions = async (req: Request, res: Response) => {
    try {
        const settingKey = req.query.settingKey as string;

        if (!settingKey) {
            const options = await Option.find();
            res.json(options);
        } else {
            const options = await Option.find({ settingKey: settingKey });
            let convertedRes: Record<string, ConvertedOption> = {};
            options.forEach((m) => {
                convertedRes[m.key] = {
                    _id: m._id,
                    name: m.name,
                    description: m.description,
                    price: m.price,
                    image: m.image
                };
            });
            res.json(convertedRes);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error ', error });
    }
};
