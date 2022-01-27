import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Tabs, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { addToCart } from '../../functions/addToCart';
import { showAverage } from '../../functions/rating';
import Laptop from '../../images/laptop.jpg';
import RatingModal from '../modal/RatingModal';
import ProductListItems from './ProductListItems';

const { TabPane } = Tabs;

// This is children component of Product component
const SingleProduct = ({ product, onStarClick, star }) => {
  const { _id, title, images, description } = product;
  const [tooltip, setTooltip] = useState('Click to add');
  // redux
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    addToCart(product, setTooltip, dispatch);
  };
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
          <Card
            cover={<img src={Laptop} alt={title} className="card-image" />}
          />
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on XXXXX XXX XXX to learn more about this product.
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h3 className="bg-info" style={{ padding: '18px' }}>
          {title}
        </h3>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div
            style={{
              paddingTop: '15px',
              paddingBottom: '15px',
              textAlign: 'center',
            }}
          >
            No rating yet
          </div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <div onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-success" />
                <br />
                Add to Cart
              </div>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br />
              Add to Wishlist
            </Link>,
            <RatingModal>
              {/* <StarRating is the children component of <RatingModal/> */}
              <StarRatings
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="orange"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
