const express = require('express');

const router = express.Router();
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, listAll, remove } = require('../controllers/product');

// routes
// for creating a single product
router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll); // products/100
router.delete('/product/:slug', authCheck, adminCheck, remove);

module.exports = router;
