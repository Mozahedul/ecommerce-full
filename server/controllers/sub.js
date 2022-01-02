const slugify = require('slugify');

const Sub = require('../models/sub');

// Save a category in the database
module.exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subcategory = await new Sub({
      name,
      parent,
      slug: slugify(name),
    }).save();
    res.status(200).json(subcategory);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Sub Category creation failed`);
  }
};

// View all the categories
module.exports.list = async (req, res) => {
  const subList = await Sub.find({}).sort({ createdAt: -1 }).exec();
  res.json(subList);
};

// View a single category
module.exports.read = async (req, res) => {
  const subcategory = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(subcategory);
};

// Update a category
module.exports.update = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subcategory = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(subcategory);
  } catch (error) {
    console.log(error);
    res.status(400).json('Sub Category update failed');
  }
};

// Delete a category
module.exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(400).send('Sub Category delete failed');
  }
};
