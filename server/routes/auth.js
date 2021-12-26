const express = require('express');
const router = express.Router();
// Import middlewares
const { authCheck } = require('../middlewares/auth');

// Import controller
const { createOrUpdateUser, currentUser } = require('../controllers/auth');

// auth routes
router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);

module.exports = router;
