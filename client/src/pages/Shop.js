import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  fetchProductsByFilter,
  getProductsByCount,
} from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import { useSelector } from 'react-redux';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { search } = useSelector(state => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    setLoading(true);
    loadAllProducts();
  }, []);

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then(p => setProducts(p.data));
    setLoading(false);
  };

  // 2. Load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = arg => {
    fetchProductsByFilter(arg).then(res => {
      setProducts(res.data);
    });
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
