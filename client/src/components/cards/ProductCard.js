import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import laptop from '../../images/laptop.jpg';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState('Click to add');
  // Destructure the product object
  const { images, title, description, slug, price } = product;

  const handleAddToCart = () => {
    // Create cart array
    let cart = [];
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

      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem('cart', JSON.stringify(unique));
    }
    setTooltip('Added');

    console.log(cart);
  };

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div
          style={{
            textAlign: 'center',
            marginTop: '15px',
            marginBottom: '15px',
          }}
        >
          No rating yet
        </div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            alt={title}
            style={{ height: '150px', objectFit: 'cover' }}
            className="p-1"
            title={title}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" />
            <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <div onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" />
              <br /> Add to Cart
            </div>
          </Tooltip>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />

        <p
          style={{
            marginTop: '10px',
            fontWeight: 'bold',
          }}
        >{`US $${price}`}</p>
      </Card>
    </>
  );
};

export default ProductCard;
