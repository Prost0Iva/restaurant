import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL as string;
        await mongoose.connect(MONGO_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error(error);
    }
};
