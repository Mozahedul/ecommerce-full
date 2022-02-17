const uniqueid = require('uniqueid');
const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Coupon = require('../models/coupon');
const Order = require('../models/order');

module.exports.userCart = async (req, res) => {
  // console.log(req.body);
  const { cart } = req.body;
  const products = [];
  const user = await User.findOne({ email: req.user.email }).exec();

  // Check if cart with logged in user id already exist
  const cartExistByThisUser = await Cart.findOne({
    orderedBy: user._id,
  }).exec();
  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log('removed old cart');
  }

  for (let i = 0; i < cart.length; i++) {
    const object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    const productFromDb = await Product.findById(cart[i]._id)
      .select('price')
      .exec();

    object.price = productFromDb.price;

    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal += products[i].price * products[i].count;
    // equals to cartTotal = cartTotal + products[i].price * products[i].count
  }

  // console.log("CartTotal ===> ", cartTotal);
  const newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();

  console.log('Save new Cart ===> ', newCart);
  res.json({ ok: true });
};

module.exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product', '_id title price totalAfterDiscount')
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

module.exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
  res.json(cart);
};

module.exports.saveAddress = async (req, res) => {
  await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

module.exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  console.log('COUPON ==> ', coupon);
  const validCoupon = await Coupon.findOne({ name: coupon }).exec();

  if (validCoupon === null) {
    res.json({
      err: 'Invalid coupon',
    });
    return;
  }
  console.log('VALID COUPON ===> ', validCoupon);
  const user = await User.findOne({ email: req.user.email }).exec();

  const { products, cartTotal } = await Cart.findOne({
    orderedBy: user._id,
  })
    .populate('products.product', '_id title price')
    .exec();

  console.log(
    'cartTotal ===> ',
    cartTotal,
    'discount ===> ',
    validCoupon.discount
  );

  // Calculate the total after discount
  const totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  Cart.findOneAndUpdate(
    { OrderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
};

module.exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;
  const user = await User.findOne({ email: req.user.email }).exec();
  const { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  const newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  // decrement quantity, increment sold
  const bulkOption = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  const updated = await Product.bulkWrite(bulkOption, {});
  console.log('PRODUCT QUANTITY--, AND SOLD++ ==> ', updated);

  console.log(newOrder);
  res.json({ ok: true });
};

module.exports.orders = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const userOrders = await Order.find({ orderedBy: user._id })
    .populate('products.product')
    .exec();

  res.json(userOrders);
};

// Add products to wishlist
module.exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  // $addToSet is a method used to avoid duplicate entry

  res.json({ ok: true });
};

// View or show wishlist products
module.exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select('wishlist')
    .populate('wishlist')
    .exec();

  res.json(list);
};

// Remove products from wishlist
module.exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  // $pull is a method used to remove item from database collection
  res.json({ ok: true });
};

// cash on delivery
module.exports.createCashOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;

  // If COD is true, create order with status of Cash on Delivery.
  if (!COD) return res.status(400).send('Create cash order failed');

  const user = await User.findOne({ email: req.user.email }).exec();
  const userCart = await Cart.findOne({ orderedBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.CartTotal * 100;
  }

  const newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqueid(),
      amount: finalAmount,
      currency: 'usd',
      status: 'Cash On Delivery',
      created: Date.now(),
      payment_method_types: ['cash'],
    },
    orderedBy: user._id,
    orderStatus: 'Cash On Delivery',
  }).save();

  // decrement quantity, increment sold
  const bulkOption = userCart.products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  const updated = await Product.bulkWrite(bulkOption, {});
  console.log('PRODUCT QUANTITY--, AND SOLD++ ==> ', updated);

  console.log(newOrder);
  res.json({ ok: true });
};
