const User = require('../models/user');
const Order = require('../models/order');

// orders, orderStatus
module.exports.orders = async (req, res) => {
  const allOrders = await Order.find({})
    .sort('-createdAt')
    .populate('products.product')
    .exec();

  res.json(allOrders);
};

module.exports.orderStatus = async (req, res) => {
  console.log('From admin controller ===> ', req.body);
  const { orderId, orderStatus } = req.body;

  const updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};
