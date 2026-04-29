const Order = require('../models/order.model');
const Product = require('../models/product.model');
const ApiError = require('../error/api-error');
const { getNextAvailableTime } = require('../helpers/nextAvilableTime');
const { orderStatusEnum } = require('../global/constants');
const moment = require('moment');

// Create Order
const createOrder = async (data) => {
    const availableTime = await getNextAvailableTime(data.sellerId);

    const product = await Product.findById(data.productId);

    const collectionTime = moment(availableTime).add(
        product.preparationTime,
        "hours"
    );

    const order = await Order.create({
        ...data,
        collectionTime
    });

    return order;
};

// Get Orders for User
const getOrdersForUser = async (userId) => {
    return await Order.find({ buyerId: userId }).populate('productId');
};

// Get Orders for Seller
const getOrdersForSeller = async (sellerId) => {
    return await Order.find({ sellerId }).populate('productId');
};
// Update Order Status
const updateOrderStatus = async (orderId, sellerId, status) => {
    const order = await Order.findOne({ _id: orderId, sellerId });
    if (!order) throw ApiError.notFound("Order not found or you don't have permission to update it");
    if (!Object.values(orderStatusEnum).includes(status)) {
        throw ApiError.badRequest("Invalid status");
    }
    order.status = status;
    await order.save();
    return order;
}
// Cancel Order
const cancelOrder = async (orderId, buyerId) => {
    const order = await Order.findOne({ _id: orderId, buyerId });
    if (!order) throw ApiError.notFound("Order not found or you don't have permission to cancel it");
    order.status = orderStatusEnum.CANCELLED;
    await order.save();
    return order;
}
// Get Order by ID
const getOrderById = async (orderId, userId) => {
    const order = await Order.findById(orderId).populate('productId');
    if (!order) throw ApiError.notFound("Order not found");
    if (order.buyerId.toString() !== userId && order.sellerId.toString() !== userId) {
        throw ApiError.badRequest("You don't have permission to view this order");
    }
    return order;
}

module.exports = {
    createOrder,
    getOrdersForUser,
    getOrdersForSeller,
    updateOrderStatus,
    cancelOrder,
    getOrderById
};
