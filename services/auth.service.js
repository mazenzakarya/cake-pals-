const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt");
const ApiError = require("../error/api-error");

const register = async ({ email, password, role }) => {
    const existingUser = await User.findOne({ email }, { _id: 1 });
    if (existingUser) {
        throw ApiError.badRequest("Email already in use");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    return generateToken(user);
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw ApiError.badRequest("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw ApiError.badRequest("Invalid email or password");
    }
    return generateToken(user);
};

module.exports = {
    register,
    login
};