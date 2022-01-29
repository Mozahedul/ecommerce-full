import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout';

const Cart = ({ history }) => {
  const { cart, user } = useSelector(state => ({ ...state }));

  const getTotal = () =>
    cart.reduce(
      (currentValue, nextValue) =>
        currentValue + nextValue.count * nextValue.price,
      0
    );

  const saveOrderToDb = () => {
    alert('Click to checkout page');
    history.push('/checkout');
  };

  const showCartItems = () => (
    <table className="table table-bordered table-hover">
      <thead className="thead-light">
        <tr>
          <th className="col">Image</th>
          <th className="col">Title</th>
          <th className="col">Price</th>
          <th className="col">Brand</th>
          <th className="col">Color</th>
          <th className="col">Count</th>
          <th className="col">Shipping</th>
          <th className="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        {cart.map(p => (
          <ProductCartInCheckout key={p._id} p={p} />
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container-fluid m-t-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} product</h4>
          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          <div>
            Total: <b>${getTotal()}</b>
          </div>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDb}
              className="btn btn-sm btn-primary mt-2"
              disabled={!cart.length}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: '/login',
                  state: { from: 'cart' },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
