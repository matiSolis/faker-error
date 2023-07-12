import mongoosePaginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';

const collection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],
        default: []
    }
});

cartSchema.plugin(mongoosePaginate);
const cartModel = mongoose.model(collection, cartSchema);
export default cartModel;
