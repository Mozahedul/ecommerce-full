const slugify = require('slugify');
const Product = require('../models/product');
const User = require('../models/user');

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
module.exports.listAll = async (req, res) => {
  const products = await Product.find({})
    .limit(parseInt(req.params.count, 10))
    .populate('category')
    .populate('subs')
    .sort([['createdAt', 'desc']])
    .exec();
  res.json(products);
};

module.exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(400).send('Product delete failed');
  }
};

module.exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('category')
    .populate('subs')
    .exec();

  res.json(product);
};

module.exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();

    res.json(updated);
  } catch (error) {
    console.log('PRODUCT UPDATE ERROR ===>', error);
    // res.status(400).send('Product update failed');
    res.status(400).json({
      err: error.message,
    });
  }
};

// WITHOUT PAGINATION
// module.exports.list = async (req, res) => {
//   try {
//     // sort = createdAt/updatedAt, order = desc/asc, limit = 3
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate('category')
//       .populate('subs')
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (error) {
//     console.log(error);
//   }
// };

// WITH PAGINATION
module.exports.list = async (req, res) => {
  console.table(req.body);
  try {
    // sort = createdAt/updatedAt, order = desc/asc, limit = 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

module.exports.productsCount = async (req, res) => {
  const total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

module.exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // Who is updating?
  // Check if currently logged in user have already added rating to this product?
  const existingRatingObject = product.ratings.find(
    ele => ele.postedBy.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    const ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log(ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { 'rating.$.star': star } },
      { new: true }
    ).exec();
    console.log('Rating updated ===> ', ratingUpdated);
    res.json(ratingUpdated);
  }
};
