const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');

// Use auth routes
router.use('/auth', authRoutes);


router.get('/', (req, res) => {
    res.send('Welcome to the Cake Pals API!');
});

module.exports = router;