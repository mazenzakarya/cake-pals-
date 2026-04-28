const joi = require('joi');
const { productTypesArrays } = require('../global/constants');

const createProductDto = {
    body: joi.object({
        name: joi.string().required(),
        preparationTime: joi.number().integer().positive().required(),
        price: joi.number().positive().required(),
        category: joi.string().valid(...productTypesArrays).required()
    })
};

const updateProductDto = {
    body: joi.object({
        name: joi.string().optional(),
        preparationTime: joi.number().integer().positive().optional(),
        price: joi.number().positive().optional(),
        category: joi.string().valid(...productTypesArrays).optional()
    })
};

module.exports = {
    createProductDto,
    updateProductDto
}