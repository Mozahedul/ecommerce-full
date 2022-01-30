import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCart } from '../functions/user';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

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

  const saveAddressToDb = () => {
    //
  };
  return (
    <div className="container-fluid m-t-2">
      <div className="row">
        <div className="col-md-6">
          <h4>Deliver Address</h4>
          <br />
          textarea
          <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
            Save
          </button>
          <hr />
          <h4>Got Coupon?</h4>
          <br />
          Coupon input and apply button
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>products ({products.length})</p>
          <hr />
          {products.map((p, i) => (
            <div key={i}>
              {p.product.title} ({p.color}) x {p.count} = $
              {p.product.price * p.count}
            </div>
          ))}
          <hr />

          <p>Cart Total: ${total}</p>
          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-primary">Place Order</button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary">Empty Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
