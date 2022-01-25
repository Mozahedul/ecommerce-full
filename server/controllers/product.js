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

  console.log('From backend ===> ', product);

  // Who is updating?
  // Check if currently logged in user have already added rating to this product?
  const existingRatingObject = product.ratings.find(
    ele => ele.postedBy.toString() === user._id.toString()
  );

  console.log('From rating', existingRatingObject);

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
      { $set: { 'ratings.$.star': star } },
      { new: true }
    ).exec();
    console.log('Rating updated ===> ', ratingUpdated);
    res.json(ratingUpdated);
  }
};

module.exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    // $ne = not equal
    // $ne is an operator
    // is used to select the documents where the value of the field
    // is not equal to the specified value
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate('category')
    .populate('subs')
    // .populate('postedBy')
    .exec();

  res.json(related);
};

// SEARCH / FILTER
const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    // .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      // .populate('postedBy', '_id name')
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    const products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      // .populate('postedBy', '_id name')
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleStars = async (req, res, stars) => {
  // project aggregation in mongodb is used to group values from multiple documents

  Product.aggregate([
    {
      $project: {
        // $$ROOT provides the root document like product
        document: '$$ROOT',
        floorAverage: {
          $floor: { $avg: '$ratings.star' },
        },
      },
    },

    // $match operator filters documents that match a defined set of condition.
    // proceed to matched documents to the next staged pipeline
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log(err);
      Product.find({ _id: aggregates })
        .populate('category', '_id name')
        .populate('subs', '_id name')
        // .populate('postedBy', '_id name')
        .exec((error, products) => {
          if (error) console.log(error);
          res.json(products);
        });
    });
};

const handleSub = async (req, res, sub) => {
  const products = await Product.find({ subs: sub })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    // .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    // .populate('postedBy', '_id, name')
    .exec();

  res.json(products);
};

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    // .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

module.exports.searchFilter = async (req, res) => {
  const { query, price, category, stars, sub, shipping, color, brand } =
    req.body;
  if (query) {
    console.log('Query', query);
    await handleQuery(req, res, query);
  }

  // price [20, 2000]
  if (price !== undefined) {
    console.log('price ==> ', price);
    await handlePrice(req, res, price);
  }

  // search with Category
  if (category) {
    console.log('Category', category);
    await handleCategory(req, res, category);
  }

  // search with star ratings
  if (stars) {
    console.log('Stars ==> ', stars);
    await handleStars(req, res, stars);
  }

  // Search products with sub category
  if (sub) {
    console.log('sub  ==> ', sub);
    await handleSub(req, res, sub);
  }

  // Search products with Shipping
  if (shipping) {
    console.log('Shipping ==> ', shipping);
    await handleShipping(req, res, shipping);
  }

  // Search products with color
  if (color) {
    console.log('Color ==> ', color);
    handleColor(req, res, color);
  }

  // Search products with brand
  if (brand) {
    console.log('Brand ==> ', brand);
    handleBrand(req, res, brand);
  }
};
