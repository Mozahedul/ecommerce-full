const mongoose = require('mongoose');

const { objectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    cart: {
      type: String,
      // default: [],
    },
    address: { type: String },
    wishlist: {
      type: objectId,
      ref: 'Product',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
