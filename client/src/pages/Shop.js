import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Checkbox, Menu, Radio, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import Star from '../components/forms/Star';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import {
  fetchProductsByFilter,
  getProductsByCount,
} from '../functions/product';
import { Badge } from 'react-bootstrap';

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [star, setStar] = useState('');
  const [brands, setBrands] = useState([
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'ASUS',
  ]);
  const [brand, setBrand] = useState('');
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ]);
  const [color, setColor] = useState('');
  const [shippings, setShippings] = useState(['Yes', 'No']);
  const [shipping, setShipping] = useState('');

  // console.log('Categories ===> ', categories);
  // console.log('Start ==> ', star);
  // console.log('Brands', brands);
  // console.log('Brand', brand);

  console.log('Shipping ===> ', shipping);

  console.log('Products from shipping', products);

  const dispatch = useDispatch();

  const { search } = useSelector(state => ({ ...state }));
  const { text } = search;

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
    if (text) {
      setPrice([0, 0]);
      setCategoryIds('');
      setStar('');
      setBrand('');
      setSub('');
      setColor('');
      setShipping('');
    }
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
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
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
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
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
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
    fetchProducts({ stars: num });
  };

  // 6. Show products by sub categories
  const showSubs = () =>
    subs.map(s => (
      <Badge
        key={s._id}
        onClick={() => handleSub(s)}
        bg="secondary"
        style={{ padding: '5px 8px', margin: '3px', cursor: 'pointer' }}
      >
        {s.name}
      </Badge>
    ));

  const handleSub = sub => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setBrand('');
    setColor('');
    setShipping('');
    setSub(sub);
    fetchProducts({ sub });
  };

  // 7. show products with star ratings
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

  // show products based on brand name
  const showBrands = () =>
    brands.map((b, i) => (
      <>
        <Radio
          key={i}
          value={b}
          name={b}
          checked={b === brand}
          onChange={handleBrand}
          style={{ paddingBottom: '5px' }}
        >
          {b}
        </Radio>
        <br />
      </>
    ));

  const handleBrand = e => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setSub('');
    setColor('');
    setShipping('');
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  // 8. Show products with colors
  const showColors = () =>
    colors.map((c, i) => (
      <>
        <Radio
          key={i}
          value={c}
          name={c}
          checked={c === color}
          onChange={handleColor}
          style={{ paddingBottom: '5px' }}
        >
          {c}
        </Radio>
        <br />
      </>
    ));

  const handleColor = e => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds('');
    setSub('');
    setStar('');
    setBrand('');
    setShipping('');
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  // 9. show products with shipping
  const showShipping = () =>
    shippings.map((sh, i) => (
      <>
        <Checkbox
          key={i}
          value={sh}
          name={sh}
          onChange={handleShoppingChange}
          checked={sh === shipping}
          style={{ paddingBottom: '8px' }}
        >
          {sh}
        </Checkbox>
        <br />
      </>
    ));

  const handleShoppingChange = e => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setSub('');
    setCategoryIds('');
    setPrice([0, 0]);
    setBrand('');
    setStar('');
    setColor('');
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  useEffect(() => {
    setLoading(true);
    loadAllProducts();
    // fetch categories
    getCategories().then(res => setCategories(res.data));

    // fetch subcategories
    getSubs().then(res => setSubs(res.data));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row" style={{ marginTop: '30px' }}>
        <div className="col-md-3">
          <h4>Search/Filter</h4>
          <Menu
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
            mode="inline"
          >
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

            {/* sub category */}
            <SubMenu
              key="4"
              title={
                <h6>
                  <DownSquareOutlined /> Sub Categories
                </h6>
              }
            >
              <div style={{ padding: '12px 0 12px 24px' }}>{showSubs()}</div>
            </SubMenu>

            {/* brands */}
            <SubMenu
              key="5"
              title={
                <h6>
                  <DownSquareOutlined /> Brands
                </h6>
              }
            >
              <div style={{ padding: '10px 0 10px 24px' }}>{showBrands()}</div>
            </SubMenu>

            {/* colors */}
            <SubMenu
              key="6"
              title={
                <h6>
                  <DownSquareOutlined /> Colors
                </h6>
              }
            >
              <div style={{ padding: '10px 0 10px 24px' }}>{showColors()}</div>
            </SubMenu>

            {/* colors */}
            <SubMenu
              key="7"
              title={
                <h6>
                  <DownSquareOutlined /> Shipping
                </h6>
              }
            >
              <div style={{ padding: '10px 0 10px 24px' }}>
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : products.length < 1 ? (
            <p>No products found</p>
          ) : (
            <>
              <h4 className="text-danger">Products</h4>
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
            </>
          )}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Shop;
