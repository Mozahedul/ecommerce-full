import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  // Destructure product object
  const { title, description, images } = product;
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ''}
          alt={title}
          style={{ height: '150px', objectFit: 'cover' }}
          className="p-1"
        />
      }
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
