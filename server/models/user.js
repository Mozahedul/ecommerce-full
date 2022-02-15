const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

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
      type: ObjectId,
      ref: 'Product',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
