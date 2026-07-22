import mongoose from 'mongoose';

interface RawOption {
    settingKey: string;
    key: string;
    name: string;
    description: string;
    price: number;
    image: string;
}
const optionSchema = new mongoose.Schema<RawOption>({
    settingKey: String,
    key: String,
    name: String,
    description: String,
    price: Number,
    image: String
});

export default mongoose.model<RawOption>('option', optionSchema, 'options');
