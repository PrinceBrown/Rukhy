const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = Schema({
    itemName: {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    OrderQuantity: {
        type: Number
    },
    OrderTotal: {
        type: Number
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})


const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;