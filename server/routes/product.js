const express = require('express');

const router = express.Router();
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, read } = require('../controllers/product');

// routes
// for creating a single product
router.post('/product', authCheck, adminCheck, create);
router.get('/products', read);

module.exports = router;
