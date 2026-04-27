const mongoose = require('mongoose');
const { orderStatusEnum } = require('../global/constants');

const orderSchema = new mongoose.Schema(
    {
        collectionTime: {
            type: Date,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: orderStatusEnum,
            default: orderStatusEnum.PENDING,
        }
    },
    { timestamps: true }
);