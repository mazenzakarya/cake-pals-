const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const moment = require("moment");

// const getNextAvailableTime = async (sellerId) => {
//   const now = moment();

//   const orders = await orderModel
//     .find({ sellerId, status: { $in: ["pending", "confirmed"] } })
//     .sort({ collectionTime: 1 });

//   let currentTime = now;
//   let lastOrderEntry = null;

//   for (const order of orders) {
//     const product = await productModel.findById(order.productId);

//     const orderStart = moment(order.collectionTime).subtract(
//       product.preparationTime,
//       "hours"
//     );

//     const orderEnd = moment(order.collectionTime);

//     // If current time is within the preparation window of this order, move current time to the end of this order
//     if (currentTime.isBetween(orderStart, orderEnd, null, "[)")) {
//       currentTime = orderEnd;
//     }
//     // track last order and its product so we can enforce minimum spacing after loop
//     lastOrderEntry = { order, product, orderEnd };
//   }

//   // Enforce minimum spacing after the latest known order: next >= last.collectionTime + last.preparationTime
//   if (lastOrderEntry) {
//     const { product, orderEnd } = lastOrderEntry;
//     const minNext = moment(orderEnd).add(product.preparationTime, 'hours');
//     if (currentTime.isBefore(minNext)) {
//       currentTime = minNext;
//     }
//   }

//   return currentTime;
// };


const getNextAvailableTime = async (sellerId) => {
  const lastOrder = await orderModel
    .findOne({ sellerId, status: { $in: ["pending", "confirmed"] } })
    .sort({ collectionTime: -1 });

  const now = moment();

  if (!lastOrder) return now;

  const product = await productModel.findById(lastOrder.productId);

  const lastBusyUntil = moment(lastOrder.collectionTime).add(
    product.preparationTime,
    "hours"
  );

  return moment.max(now, lastBusyUntil);
};
module.exports = {
  getNextAvailableTime,
};