const express = require('express');
const router = express.Router();
const { createOrder, updateOrderStatus, cancelOrder, getOrderById, getOrdersForSeller, getOrdersForUser } = require('../controllers/order.controller');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post('/', createOrder);
router.put('/:id/status', updateOrderStatus);
router.put('/:id/cancel', cancelOrder);
router.get('/:id', getOrderById);
router.get('/seller/:sellerId', getOrdersForSeller);
router.get('/user/:userId', getOrdersForUser);

module.exports = router;