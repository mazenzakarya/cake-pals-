const mongoose = require('mongoose');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const ApiError = require('.././error/api-error-handler');

const addRating = async (userId, productId, orderId, rating, comment) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw ApiError.notFound("Product not found");
    }

    // optional: check if user already rated this product
    const existing = await Rating.findOne({ user: userId, product: productId });

    if (existing) {
        throw ApiError.badRequest("You already rated this product");
    }

   
    const newRating = new Rating({
        user: userId,
        product: productId, 
        order: orderId,
        rating,
        comment
    });
    await newRating.save();
};

// update rating
const updateRating = async (userId, productId, rating, comment) => {
    const existing = await Rating.findOne({ user: userId, product: productId });

    if (!existing) {
        throw ApiError.notFound("Rating not found");
    }

    existing.rating = rating;
    existing.comment = comment;

    await existing.save();

    return existing;
};

//Get Ratings for Product
const getProductRatings = async (productId) => {
    return await Rating.find({ product: productId })
        .populate('user', 'name')
        .sort({ createdAt: -1 });
};
//

