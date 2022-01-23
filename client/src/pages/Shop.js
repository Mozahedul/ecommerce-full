import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  fetchProductsByFilter,
  getProductsByCount,
} from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import { useSelector } from 'react-redux';
import { Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  const dispatch = useDispatch();

  const { search } = useSelector(state => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    setLoading(true);
    loadAllProducts();
  }, []);

  const fetchProducts = arg => {
    fetchProductsByFilter(arg).then(res => {
      setProducts(res.data);
    });
  };

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

  // 3. Load products based on price range

  useEffect(() => {
    console.log('Ok to request');
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = value => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ marginTop: '30px' }}>
        <div className="col-md-3">
          <h4>Search/Filter</h4>
          <Menu defaultOpenKeys={['1', '2']} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={v => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max={4999}
                />
              </div>
            </SubMenu>
          </Menu>
        </div>
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
