const slugify = require('slugify');
const Product = require('../models/product');

module.exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    // res.status(400).send('Create product failed');
    res.status(400).json({
      err: error.message,
    });
  }
};

// populate() method is used to get reference document in other collection
module.exports.read = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};
