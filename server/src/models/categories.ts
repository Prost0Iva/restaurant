import mongoose from 'mongoose';

interface RawCategory {
    key: string;
    name: string;
    description: string;
}
const categorySchema = new mongoose.Schema<RawCategory>({
    key: String,
    name: String,
    description: String
});

export default mongoose.model<RawCategory>('category', categorySchema, 'categories');
