const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const ratingRoutes = require('./rating.routes');

// Use auth routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/ratings', ratingRoutes);


router.get('/', (req, res) => {
    res.send('Welcome to the Cake Pals API!');
});

module.exports = router;