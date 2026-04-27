const express = require("express");
const { validate } = require('express-validation');
const { registerValidation, loginValidation } = require('../DTOs/auth.dto');
const { register, login } = require('../controllers/auth.controller');
const router = express.Router();

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);

module.exports = router;