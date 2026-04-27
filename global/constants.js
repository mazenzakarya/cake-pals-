const roleArrays = ["member", "seller"];
const roleEnum = {
    MEMBER: "member",
    SELLER: "seller"
};

const orderStatusArrays = ["available", "out_of_stock", "discontinued"];
const orderStatusEnum = {
    AVAILABLE: "available",
    PENDING: "pending",
    OUT_OF_STOCK: "out_of_stock",
    DISCONTINUED: "discontinued"
};

const productTypesArrays = ["cake", "pie"];
const productTypesEnum = {
    CAKE: "cake",
    PIE: "pie"
};

module.exports = {
    roleArrays,
    roleEnum,
    orderStatusArrays,
    orderStatusEnum,
    productTypesArrays,
    productTypesEnum
};
