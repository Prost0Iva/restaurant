import mongoose from 'mongoose';

interface RawMarket {
    key: string;
    name: string;
    image: string;
}
const marketSchema = new mongoose.Schema<RawMarket>({
    key: String,
    name: String,
    image: String
});

export default mongoose.model<RawMarket>('market', marketSchema, 'markets');
