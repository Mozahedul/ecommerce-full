const express = require('express');

const router = express.Router();

// auth routes
router.get('/user', (req, res) => {
  res.json({
    data: 'Hey you hit from user routes',
  });
});

module.exports = router;
