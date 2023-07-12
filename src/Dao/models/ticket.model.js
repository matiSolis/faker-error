import mongoosePaginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';

const collection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_dateTime: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

ticketSchema.plugin(mongoosePaginate);

const ticketModel = mongoose.model(collection, ticketSchema);

export default ticketModel;
