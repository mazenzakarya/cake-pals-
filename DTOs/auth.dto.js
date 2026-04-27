const Joi = require('joi');
const { roleArrays } = require('../global/constants');

const registerValidation = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid(...roleArrays).optional()
    })
};

const loginValidation = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
};

module.exports = { registerValidation, loginValidation }