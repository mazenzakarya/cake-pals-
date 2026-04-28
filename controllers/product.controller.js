const tryCatchWrapper = require('../helpers/tryCatchWrapper');
const productService = require('../services/product.services');
const { formatSuccessResponse } = require(".././helpers/formatResponse");

// Create a new product
const createProduct = tryCatchWrapper(async (req, res) => {
    const { name, preparationTime, price, category } = req.body;
    const sellerId = req.user.id;

    const product = await productService.createProduct({ name, preparationTime, price, category, sellerId });
    res.status(201).json(formatSuccessResponse(product));
});

// Get all products
const getAllProducts = tryCatchWrapper(async (req, res) => {
    const products = await productService.getAllProducts();
    res.status(200).json(formatSuccessResponse(products));
});

// Get product by ID
const getProductById = tryCatchWrapper(async (req, res) => {
    const prodId = req.params.id;
    const product = await productService.getProductById(prodId);
    res.status(200).json(formatSuccessResponse(product));
});

// Update product by ID
const updateProductById = tryCatchWrapper(async (req, res) => {
    const prodId = req.params.id;
    const { name, preparationTime, price, category } = req.body;
    const sellerId = req.user.id;

    const product = await productService.updateProductById(prodId, sellerId, { name, preparationTime, price, category });
    res.status(200).json(formatSuccessResponse(product));
});

// Delete product by ID
const removeProductById = tryCatchWrapper(async (req, res) => {
    const prodId = req.params.id;
    const sellerId = req.user.id;
    await productService.removeProductById(prodId, sellerId);
    res.status(200).json(formatSuccessResponse({ message: 'Product deleted successfully' }));
}
);
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    removeProductById
};
