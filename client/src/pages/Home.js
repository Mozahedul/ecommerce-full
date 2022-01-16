import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { getProductsByCount } from '../functions/product';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(products);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(2).then(res => {
      setProducts(res.data);
    });
  };

  return (
    <Row>
      <Col span={22} offset={1}>
        <h3 className="m-t-2">Home Page</h3>
        {/* {JSON.stringify(products)} */}
      </Col>
    </Row>
  );
};

export default Home;
