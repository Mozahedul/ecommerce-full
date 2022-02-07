const stripe = require('stripe')(process.env.STRIPE_SECRET);
const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');

module.exports.createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: 'usd',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
