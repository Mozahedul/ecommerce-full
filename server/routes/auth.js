const express = require('express');
const createOrUpdateUser = require('../controllers/auth');
const fs = require('fs');

const router = express.Router();

// Import middlewares 
const {authCheck} = require("../middlewares/auth")
// auth routes
router.post('/create-or-update-user', authCheck, createOrUpdateUser);

module.exports = router;
