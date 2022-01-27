import _ from 'lodash';

// Create cart array
let cart = [];
export const addToCart = (product, setTooltip, dispatch) => {
  if (typeof window !== 'undefined') {
    // if cart is in local storage GET it
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    // push new product to cart
    cart.push({
      ...product,
      count: 1,
    });

    // remove duplicates
    let unique = _.uniqWith(cart, _.isEqual);

    // Save to local storage
    localStorage.setItem('cart', JSON.stringify(unique));

    // show tooltip
    setTooltip('Added');

    // Add to redux state
    dispatch({
      type: 'ADD_TO_CART',
      payload: unique,
    });
  }
};
