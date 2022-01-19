/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SingleProduct from '../components/cards/SingleProduct';
import { getProduct } from '../functions/product';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;

  console.log(product);

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(slug).then(res => setProduct(res.data));
  return (
    <div className="container-fluid">
      <div className="row" style={{ marginTop: '30px' }}>
        <SingleProduct product={product} />
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