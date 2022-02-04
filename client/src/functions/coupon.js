import axios from 'axios';

// list the coupon
export const getCoupons = async authtoken =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

// remove the coupon
export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: { authtoken },
  });

// create coupon
export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    { headers: { authtoken } }
  );
