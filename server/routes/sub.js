const express = require('express');

const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require('../controllers/sub');

// routes
// for creating a single category
router.post('/sub', authCheck, adminCheck, create);

// view all the categories
router.get('/subs', list);

// view a single sub
router.get('/sub/:slug', read);

// update a sub
router.put('/sub/:slug', authCheck, adminCheck, update);

// remove or delete a sub
router.delete('/sub/:slug', authCheck, adminCheck, remove);

module.exports = router;
