import mongoose from 'mongoose';

interface RawComponents {
    [key: string]: string | string[];
}
interface RawProduct {
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    market: string;
    type: string;
    weight: number;
    components: RawComponents;
}

const productSchema = new mongoose.Schema<RawProduct>({
    name: String,
    description: String,
    image: String,
    price: Number,
    category: String,
    market: String,
    type: String,
    weight: Number,
    components: Object
});

export default mongoose.model<RawProduct>('menu', productSchema, 'menu');
