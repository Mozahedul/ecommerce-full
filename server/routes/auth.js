const express = require('express');
const createOrUpdateUser = require('../controllers/auth');
const fs = require('fs');

const router = express.Router();

// auth routes
router.get('/create-or-update-user', createOrUpdateUser);

module.exports = router;
