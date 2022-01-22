import React, { useState } from 'react';
import { useEffect } from 'react';
import { getProductsByCount } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(12).then(p => setProducts(p.data));
    setLoading(false);
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ marginTop: '30px' }}>
        <div className="col-md-3">Filter / search</div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          <hr />
          {products.length < 1 && <p>No products found</p>}

          <div className="row">
            {products.map(p => (
              <div
                key={p._id}
                className="col-md-4"
                style={{ marginBottom: '15px' }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
