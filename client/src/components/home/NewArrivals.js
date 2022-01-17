import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductCard';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  console.log(productsCount, page);

  console.log(Math.ceil((productsCount / 3) * productsCount));

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then(res => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts('createdAt', 'desc', page).then(res => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      {productsCount}
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map(product => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav
          className="col-md-12"
          style={{ textAlign: 'center', marginTop: '30px' }}
        >
          <Pagination
            current={page}
            total={Math.ceil(productsCount / 3) * productsCount}
            onChange={value => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
