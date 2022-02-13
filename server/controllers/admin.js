const User = require('../models/user');
const Order = require('../models/order');

// orders, orderStatus
module.exports.orders = async (req, res) => {
  const orders = await Order.find({})
    .sort('-createdAt')
    .populate('products.product')
    .exec();

  res.json(orders);
};

module.exports = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  const updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};
