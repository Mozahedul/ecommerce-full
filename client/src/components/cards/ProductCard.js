import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import laptop from '../../images/laptop.jpg';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // Destructure the product object
  const { images, title, description, slug, price } = product;

  const addToCard = () => {
    //
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
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" />
            <br /> View Product
          </Link>,
          <>
            <ShoppingCartOutlined
              onClick={() => addToCard(slug)}
              className="text-danger"
            />
            <br /> Add to Cart
          </>,
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
