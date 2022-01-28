import React from 'react';
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.jpg';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ProductCartInCheckout = ({ p }) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const dispatch = useDispatch();

  const handleColorChange = e => {
    console.log('color changed ==> ', e.target.value);

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
        return cart;
      });

      console.log('Cart updated color ==> ', cart);
      localStorage.setItem('cart', JSON.stringify(cart));

      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleQuantityChange = e => {
    const countVal = e.target.value < 1 ? 1 : e.target.value;

    if (countVal > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = countVal;
        }
        return cart;
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '80px', height: 'auto' }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            name="color"
            className="form-control"
            onChange={handleColorChange}
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter(c => c !== p.color)
              .map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            value={p.count}
            onChange={handleQuantityChange}
            className="form-control"
          />
        </td>
        <td>Shipping Icon</td>
        <td>Delete Icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCartInCheckout;
