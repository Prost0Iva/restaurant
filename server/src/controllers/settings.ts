import type { Request, Response } from 'express';
import Setting from '../models/settings.js';

interface ConvertedSetting {
    _id?: object;
    name: string;
    object: string;
    title: string;
    multiple: boolean;
}

export const getAllSettings = async (req: Request, res: Response) => {
    try {
        const settings = await Setting.find();
        let convertedRes: Record<string, ConvertedSetting> = {};
        settings.forEach((m) => {
            convertedRes[m.key] = {
                _id: m._id,
                name: m.name,
                object: m.object,
                title: m.title,
                multiple: m.multiple
            };
        });
        res.json(convertedRes);
    } catch (error) {
        res.status(500).json({ message: 'Server error ', error });
    }
};
