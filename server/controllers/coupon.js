const Coupon = require('../models/coupon');

// Create, remove, list
module.exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, expiry, discount } = req.body.coupon;
    const coupon = await new Coupon({ name, expiry, discount }).save();
    res.json(coupon);
  } catch (error) {
    console.log(error);
  }
};

// for removing coupon
module.exports.remove = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.couponId).exec();
    res.json(coupon);
  } catch (error) {
    console.log(error);
  }
};

module.exports.list = async (req, res) => {
  try {
    const coupon = await Coupon.find({}).sort({ createdAt: -1 }).exec();
    res.json(coupon);
  } catch (error) {
    console.log(error);
  }
};
