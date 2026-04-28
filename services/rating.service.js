const mongoose = require('mongoose');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const ApiError = require('../error/api-error');

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
const getProductsRatings = async (productId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  return await Rating.find({ product: productId })
    .populate('user', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};
// get average rating for product
const getProductRatingStats = async (productId) => {
  const result = await Rating.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 }
      }
    }
  ]);

  return result[0] || { avgRating: 0, count: 0 };
};

module.exports = {
  addRating,
  updateRating,
  getProductsRatings,
  getProductRatingStats
};

