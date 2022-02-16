const express = require('express');

const router = express.Router();

// middlewares
const { authCheck } = require('../middlewares/auth');

// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
} = require('../controllers/user');

router.post('/user/cart', authCheck, userCart); // save cart
router.get('/user/cart', authCheck, getUserCart); // get cart
router.delete('/user/cart', authCheck, emptyCart); // empty cart
router.post('/user/address', authCheck, saveAddress);

router.post('/user/order', authCheck, createOrder); // stripe
router.post('/user/cash-order', authCheck, createCashOrder); // Cash on delivery
router.get('/user/orders', authCheck, orders);

// coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart);

// Wishlist
router.post('/user/wishlist', authCheck, addToWishlist);
router.get('/user/wishlist', authCheck, wishlist);
router.put('/user/wishlist/:productId', authCheck, removeFromWishlist);
// auth routes
// router.get('/user', (req, res) => {
//   res.json({
//     data: 'Hey you hit from user routes',
//   });
// });

module.exports = router;
