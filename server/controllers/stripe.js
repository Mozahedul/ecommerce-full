const stripe = require('stripe')(process.env.STRIPE_SECRET);
const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');

module.exports.createPaymentIntent = async (req, res) => {
  // 1. find user
  const user = await User.findOne({ email: req.user.email }).exec();

  // 2. get user cart total
  const { cartTotal } = await Cart.findOne({ orderedBy: user._id }).exec();

  console.log('CART TOTAL CHARGED ==> ', cartTotal);
  // Create payment intent with order & currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartTotal * 100,
    currency: 'usd',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
