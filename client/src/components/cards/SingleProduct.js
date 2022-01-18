import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Laptop from '../../images/laptop.jpg';
const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map(i => (
                <img src={i.url} key={i.public_id} alt={title} />
              ))}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} alt={title} />} />
        )}
      </div>
      <div className="col-md-5">
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" />
              <br />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br />
              Add to Wishlist
            </Link>,
          ]}
        >
          <Meta title={title} description={description} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
