const express = require('express');

const router = express.Router();

// middlewares
const { authCheck } = require('../middlewares/auth');

// controllers
const { userCart } = require('../controllers/user');

router.post('/user/cart', authCheck, userCart);
// auth routes
// router.get('/user', (req, res) => {
//   res.json({
//     data: 'Hey you hit from user routes',
//   });
// });

module.exports = router;
   