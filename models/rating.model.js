const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            trim: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
    },
    { timestamps: true }
);
// Ensure a user can only rate a product once
ratingSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);

