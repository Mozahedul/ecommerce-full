const express = require('express');

const router = express.Router();

// auth routes
router.get('/create-or-update-user', (req, res) => {
  res.json({
    data: 'Hey you hit from api/create-or-update-user routes',
  });
});

module.exports = router;
