const orderService = require('../services/order.services');
const tryCatchWrapper = require('../helpers/tryCatchWrapper');
const { formatSuccessResponse } = require(".././helpers/formatResponse");
const Product = require('../models/product.model');

// Create Order
const createOrder = tryCatchWrapper(async (req, res) => {
    const buyerId = req.user.id;
    const sellerId = await Product.findById(req.body.productId).then(product => product.sellerId);
    const { productId } = req.body;
    const order = await orderService.createOrder({ buyerId, sellerId, productId });
    res.status(201).json(formatSuccessResponse(order));
});

// Get Orders for User
const getOrdersForUser = tryCatchWrapper(async (req, res) => {
    const userId = req.user.id;
    const orders = await orderService.getOrdersForUser(userId);
    res.status(200).json(formatSuccessResponse(orders));
});
// Get Orders for Seller
const getOrdersForSeller = tryCatchWrapper(async (req, res) => {
    const sellerId = req.user.id;
    const orders = await orderService.getOrdersForSeller(sellerId);
    res.status(200).json(formatSuccessResponse(orders));
});
// Update Order Status
const updateOrderStatus = tryCatchWrapper(async (req, res) => {
    const sellerId = req.user.id;
    const { status } = req.body;
    const { id: orderId } = req.params;
    const order = await orderService.updateOrderStatus(orderId, sellerId, status);
    res.status(200).json(formatSuccessResponse(order));
});

// Cancel Order
const cancelOrder = tryCatchWrapper(async (req, res) => {
    const buyerId = req.user.id;
    const { id: orderId } = req.params;
    const order = await orderService.cancelOrder(orderId, buyerId);
    res.status(200).json(formatSuccessResponse(order));
});
// Get Order by ID
const getOrderById = tryCatchWrapper(async (req, res) => {
    const userId = req.user.id;
    const { id: orderId } = req.params;
    const order = await orderService.getOrderById(orderId, userId);
    res.status(200).json(formatSuccessResponse(order));
});

module.exports = {
    createOrder,
    getOrdersForUser,
    getOrdersForSeller,
    updateOrderStatus,
    cancelOrder,
    getOrderById
};