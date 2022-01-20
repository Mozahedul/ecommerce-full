/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SingleProduct from '../components/cards/SingleProduct';
import { getProduct, productStar } from '../functions/product';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);

  // redux
  const { user } = useSelector(state => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(slug).then(res => setProduct(res.data));

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.table(newRating, name);
    productStar(name, newRating, user.token).then(res => {
      // console.log('Rating clicked ===> ', res.data);
      loadSingleProduct(); // to show the updated rating in real time
    });
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ marginTop: '30px' }}>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <div
          className="col-md-12"
          style={{ textAlign: 'center', padding: '15px 0' }}
        >
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
