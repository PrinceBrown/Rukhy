const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    itemName: {
        type: String
    },
    itemPrice: {
        type: Number
    },
    itemImage: {
        type: String
    },
    itemQuantity: {
        type: Number
    }
})


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;