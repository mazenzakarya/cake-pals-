const express = require('express');
const router = express.Router();
const ratingService = require('../services/rating.service');
const verifyToken = require('../middlewares/verifyToken');
const { createRating, updateRating, getProductsRatings, getProductRatingStats } = require('../controllers/rating.controller');

router.use(verifyToken);
router.post('/', createRating);
router.put('/', updateRating);
router.get('/product/:productId', getProductsRatings);
router.get('/product/:productId/stats', getProductRatingStats);

module.exports = router;