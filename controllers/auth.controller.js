const tryCatchWrapper = require("../helpers/tryCatchWrapper");
const authService = require("../services/auth.service");
const { formatSuccessResponse } = require(".././helpers/formatResponse");

const register = tryCatchWrapper(async (req, res) => {
    const { email, password, role } = req.body;
    const token = await authService.register({ email, password, role });
    res.status(201).json(formatSuccessResponse({ token }));
}
);

const login = tryCatchWrapper(async (req, res) => {
    const { email, password } = req.body;
    const token = await authService.login({ email, password });
    res.status(200).json(formatSuccessResponse({ token }));
}
);

module.exports = {
    register,
    login
};

















