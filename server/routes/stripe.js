const express = require('express');
const { createPaymentIntent } = require('../controllers/stripe');

const router = express.Router();

// Middleware
const { authCheck } = require('../middlewares/auth');

router.post('/create-payment-intent', authCheck, createPaymentIntent);

module.exports = router;
