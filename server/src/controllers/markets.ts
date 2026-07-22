import type { Request, Response } from 'express';
import Market from '../models/markets.js';

interface ConvertedMarket {
    _id?: Object;
    name: string;
    image: string;
}

export const getAllMarkets = async (req: Request, res: Response) => {
    try {
        const markets = await Market.find();
        let convertedRes: Record<string, ConvertedMarket> = {};
        markets.forEach((m) => {
            convertedRes[m.key] = {
                _id: m._id,
                name: m.name,
                image: m.image
            };
        });
        res.json(convertedRes);
    } catch (error) {
        res.status(500).json({ message: 'Server error ', error });
    }
};
