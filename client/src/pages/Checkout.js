import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  applyCoupon,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from '../functions/user';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState('');
  const [discountError, setDiscountError] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      getUserCart(user.token).then(res => {
        console.log(
          'User cart response ===> ',
          JSON.stringify(res.data, null, 4)
        );
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      });
    }
  }, [user]);

  const emptyCart = () => {
    // Remove cart from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }

    // Remove cart from redux state
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });

    // Remove cart form backend / database
    emptyUserCart(user.token).then(res => {
      setProducts([]);
      setTotal(0);
      toast.error('Cart is empty. Continue shopping');
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then(res => {
      // console.log(res);
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success('Address saved');
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log('Send coupon to backend ===> ', coupon);

    applyCoupon(user.token, coupon).then(res => {
      console.log('RESPONSE ON COUPON ==> ', res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied
      }
      // error
      if(res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied  
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary m-t-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        {p.product.title} ({p.color}) x {p.count} = ${p.product.price * p.count}
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={e => setCoupon(e.target.value)}
        type="text"
        value={coupon}
        className="form-control"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary m-t-2">
        Apply
      </button>
    </>
  );

  return (
    <div className="container-fluid m-t-2">
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <br />
          {showAddress()}
          <hr />
          <br />
          <h4>Got Coupon?</h4>
          {showApplyCoupon()}
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>products ({products.length})</p>
          <hr />
          {showProductSummary()}
          <hr />

          <p>Cart Total: ${total}</p>
          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
              >
                Place Order
              </button>
            </div>
            <div className="col-md-6">
              <button
                disabled={products.length === 0}
                onClick={emptyCart}
                className="btn btn-primary"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
