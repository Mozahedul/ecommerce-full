// slug is part of a URL identifies the document object
// using the human readable keyword.

const mongoose = require('mongoose');

// Create a category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [3, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

// create a category model and export
module.exports = mongoose.model('Category', categorySchema);
