const mongoose = require('mongoose');
const { productTypesEnum } = require('../global/constants');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        category: {
            type: String,
            enum: productTypesEnum
        },
        ratingsCount: {
            type: Number,
            default: 0
        },
        ratingsAverage: {
            type: Number,
            default: 0,
        },
        preparationTime: {
            type: Number,
            required: true,
            min: 1
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);