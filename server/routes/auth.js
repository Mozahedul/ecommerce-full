const express = require('express');
const router = express.Router();
// Import middlewares
const { authCheck } = require('../middlewares/auth');

// Import controller
const { createOrUpdateUser } = require('../controllers/auth');

// auth routes
router.post('/create-or-update-user', authCheck, createOrUpdateUser);

module.exports = router;
