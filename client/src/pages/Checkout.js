import React from 'react';

const Checkout = () => {
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
          <p>products</p>
          <hr />
          <p>List of products</p>
          <hr />
          <p>Cart Total: 1x</p>
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
