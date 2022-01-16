import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { getProductsByCount } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import Jumbotron from '../components/cards/Jumbotron';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(products);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(2).then(res => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div
        className="jumbotron text-danger h1 font-weight-bold"
        style={{ textAlign: 'center' }}
      >
        <Jumbotron text={['Latest Product', 'New Arrivals', 'Best Sellers']} />
      </div>

      <div className="container">
        <div className="row">
          {products.map(product => (
            <div className="col-md-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
