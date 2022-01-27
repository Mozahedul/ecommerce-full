import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const { cart, user } = useSelector(state => ({ ...state }));
  return (
    <div className="container-fluid">
      <div className="row">
        <h4>Cart</h4>
        {JSON.stringify(cart)}
      </div>
    </div>
  );
};

export default Cart;
