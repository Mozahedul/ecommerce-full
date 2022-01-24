import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  fetchProductsByFilter,
  getProductsByCount,
} from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import { useSelector } from 'react-redux';
import { Menu, Slider, Checkbox } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getCategories } from '../functions/category';
import Star from '../components/forms/Star';

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');

  console.log('Categories ===> ', categories);
  console.log('Start ==> ', star);

  const dispatch = useDispatch();

  const { search } = useSelector(state => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    setLoading(true);
    loadAllProducts();
    // fetch categories
    getCategories().then(res => setCategories(res.data));
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
    setCategoryIds([]);
    setStar('');
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map(c => (
      <div key={c._id} style={{ paddingTop: '4px', paddingBottom: '4px' }}>
        <Checkbox
          onChange={handleCheck}
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  // handle check for category
  const handleCheck = e => {
    // reset
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });

    setPrice([0, 0]);
    setStar('');
    // console.log(e.target.value);
    const inTheState = [...categoryIds];
    const justChecked = e.target.value;
    const foundInTheState = inTheState.indexOf(justChecked); // returns index number or -1
    // indexOf() method returns index number if found the items otherwise returns -1;
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found the index of the item, then remove
      // for avoiding the duplicate
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = num => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <br />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <br />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <br />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <br />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row" style={{ marginTop: '30px' }}>
        <div className="col-md-3">
          <h4>Search/Filter</h4>
          <Menu defaultOpenKeys={['1', '2', '3']} mode="inline">
            {/* price */}
            <SubMenu
              key="1"
              title={
                <h6>
                  <DollarOutlined /> Price
                </h6>
              }
            >
              <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
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

            {/* category */}
            <SubMenu
              key="2"
              title={
                <h6>
                  <DownSquareOutlined /> Categories
                </h6>
              }
            >
              <div style={{ padding: '12px 0 12px 24px' }}>
                {showCategories()}
              </div>
            </SubMenu>

            {/* stars */}
            <SubMenu
              key="3"
              title={
                <h6>
                  <StarOutlined /> Rating
                </h6>
              }
            >
              <div style={{ padding: '12px 0 12px 24px' }}>{showStars()}</div>
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
