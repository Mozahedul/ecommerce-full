const slugify = require('slugify');

const Category = require('../models/category');
const Sub = require('../models/sub');

// Save a category in the database
module.exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Category creation failed`);
  }
};

// View all the categories
module.exports.list = async (req, res) => {
  const categoryList = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(categoryList);
};

// View a single category
module.exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

// Delete a category
module.exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json('Category update failed');
  }
};

module.exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(400).send('Category delete failed');
  }
};

module.exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) {
      console.log(err);
    }
    res.json(subs);
  });
};
