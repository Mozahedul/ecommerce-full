const slugify = require('slugify');

const Category = require('../models/category');

module.exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(400).send('Create category failed');
  }
};

module.exports.list = async (req, res) => {
  //
};

module.exports.read = async (req, res) => {
  //
};

module.exports.update = async (req, res) => {
  //
};

module.exports.remove = async (req, res) => {
  //
};
