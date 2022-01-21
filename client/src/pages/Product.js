/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import SingleProduct from '../components/cards/SingleProduct';
import { getProduct, getRelated, productStar } from '../functions/product';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  // redux
  const { user } = useSelector(state => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        ele => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star;
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then(res => {
      setProduct(res.data);
      // Load related product
      getRelated(res.data._id).then(res => setRelated(res.data));
    });
  };

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
      <div className="row">
        {related.length ? (
          related.map(r => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <span>No Product Found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
