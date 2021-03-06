import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../functions/addToCart';
import { showAverage } from '../../functions/rating';
import laptop from '../../images/laptop.jpg';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState('Click to add');
  const dispatch = useDispatch();
  // Destructure the product object
  const { images, title, description, slug, price, quantity } = product;

  // const { user, cart } = useSelector(state => ({ ...state }));

  const handleAddToCart = () => {
    addToCart(product, setTooltip, dispatch);
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
          <Link to={`/product/${slug}`} style={{ textDecoration: 'none' }}>
            <EyeOutlined className="text-warning" />
            <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <Button
              type="text"
              onClick={handleAddToCart}
              disabled={quantity < 1}
            >
              <ShoppingCartOutlined className="text-danger" />
              <br /> {quantity < 1 ? 'Out of stock' : 'Add to Cart'}
            </Button>
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
