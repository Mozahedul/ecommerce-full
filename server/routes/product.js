const express = require('express');

const router = express.Router();
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create } = require('../controllers/product');

// routes
// for creating a single product
router.post('/product', authCheck, adminCheck, create);

module.exports = router;
