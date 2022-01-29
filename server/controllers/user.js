const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

module.exports.userCart = async (req, res) => {
  console.log(req.body);
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

    const { price } = await Product.findById(cart[i]._id)
      .select('price')
      .exec();

    object.price = price;

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

  console.log(newCart, 'new Cart');
  res.json({ ok: true });
};
