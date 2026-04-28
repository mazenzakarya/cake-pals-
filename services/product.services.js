const mongoose = require('mongoose');
const Product = require('../models/product.model');
const ApiError = require('../error/api-error');
const { RolesEnum } = require('../global/constants');

const createProduct = async ({ name, preparationTime, price, category, sellerId }) => {
    const product = new Product({ name, preparationTime, price, category, sellerId });
    await product.save();
    return product;
}

// Get all products
const getAllProducts = async () => {
    return await Product.find();


}
//get product by seller id
const getProductBySellerId = async (sellerId) => {
    return await Product.find({ sellerId: sellerId });
}

//remove product by id
const removeProductById = async (productId, sellerId) => {
    const product = await Product.findOneAndDelete({ _id: productId, sellerId });
    if (!product) {
        throw ApiError.notFound("Product not found or you don't have permission to delete it");
    }
    return product;
}
//update product by id
const updateProductById = async (productId, sellerId, data) => {
    const product = await Product.findOneAndUpdate(
        { _id: productId, sellerId },
        data,
        { new: true }
    );
    if (!product) {
        throw ApiError.notFound("Product not found or you don't have permission to update it");
    }
    return product;
}
// get product by id
const getProductById = async (prodId) => {
    if (!mongoose.Types.ObjectId.isValid(prodId)) {
        throw ApiError.badRequest("Invalid product ID");
    }
    const product = await Product.findById(prodId);
    if (!product) {
        throw ApiError.notFound("Product not found");
    }
    return product;
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductBySellerId,
    removeProductById,
    updateProductById,
    getProductById,
}