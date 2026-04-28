const tryCatchWrapper = require('.././helpers/tryCatchWrapper');
const ratingService = require('../services/rating.service');
const { formatSuccessResponse } = require(".././helpers/formatResponse");

// Create a new rating
const createRating = tryCatchWrapper(async (req, res) => {
    const { productId, rating } = req.body;
    const userId = req.user.id;
    const orderId = req.body.orderId; // optional, if you want to link rating to an order
    const newRating = await ratingService.addRating(userId, productId, orderId, rating);
    await newRating;

    res.status(201).json(formatSuccessResponse({ message: 'Rating added successfully' }, newRating));

});

// Update existing rating
const updateRating = tryCatchWrapper(async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id;
    const updated = await ratingService.updateRating(userId, productId, rating, comment);
    res.status(200).json(formatSuccessResponse(updated));
});

// Get ratings for a product
const getProductsRatings = tryCatchWrapper(async (req, res) => {
    const productId = req.params.productId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const ratings = await ratingService.getProductsRatings(productId, page, limit);
    res.status(200).json(formatSuccessResponse(ratings));
});

// Get average rating and total ratings for a product
const getProductRatingStats = tryCatchWrapper(async (req, res) => {
    const productId = req.params.productId;
    const stats = await ratingService.getProductRatingStats(productId);
    res.status(200).json(formatSuccessResponse(stats));
});

module.exports = {
    createRating,
    updateRating,
    getProductsRatings,
    getProductRatingStats
};