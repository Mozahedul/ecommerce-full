import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.jpg';
// import handleRemove from '../../pages/admin/product/AllProducts';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // Destructure product object
  const { title, description, images, slug } = product;

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
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 35)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
