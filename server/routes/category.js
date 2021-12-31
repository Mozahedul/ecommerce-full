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
} = require('../controllers/category');

// routes
// for creating a single category
router.post('/category', authCheck, adminCheck, create);

// view all the categories
router.get('/categories', list);

// view a single category
router.get('/category/:slug', read);

// update a category
router.put('/category/:slug', authCheck, adminCheck, update);

// remove or delete a category
router.delete('/category/:slug', authCheck, adminCheck, remove);

module.exports = router;
