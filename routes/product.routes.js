const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');
const { createProductDto, updateProductDto } = require('../DTOs/product.dto');
const { createProduct, getProductById, updateProductById, removeProductById, getAllProducts } = require('../controllers/product.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
// Protect all operations. Only sellers can create, update or delete products
router.use(verifyToken);
router.post('/', validate(createProductDto), createProduct);

router.put('/:id', validate(updateProductDto), updateProductById);
router.delete('/:id', removeProductById);

module.exports = router;