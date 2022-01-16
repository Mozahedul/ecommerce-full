import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.jpg';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // Destructure the product object
  const { images, title, description, slug } = product;

  const handleRemove = () => {
    //
  };
  return (
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
            onClick={() => handleRemove(slug)}
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
    </Card>
  );
};

export default ProductCard;
