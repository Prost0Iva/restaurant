import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    category: String,
    market: String,
    type: String,
    weight: Number,
    components: {
        size: String,
        bread: String,
        vegetable: [String],
        sauce: [String],
        filling: [String]
    }
});

export default mongoose.model('menu', productSchema, 'menu');
