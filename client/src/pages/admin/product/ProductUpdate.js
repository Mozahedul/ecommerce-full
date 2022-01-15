import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FileUpload from '../../../components/forms/FileUpload';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories, getCategorySubs } from '../../../functions/category';
import { getProduct } from '../../../functions/product';

// import { useParams } from 'react-router-dom';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

const ProductUpdate = ({ match }) => {
  const { user } = useSelector(state => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  // const [showSub, setShowSub] = useState(false);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(values);

  // const { slug } = useParams();
  // console.log(useParams());

  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then(p => {
      // console.log('single product ==> ', p);
      // 1. load single product
      setValues({ ...values, ...p.data });
      // 2. load single product category subs to
      // show as default in antd Select
      getCategorySubs(p.data.category._id).then(res => setSubOptions(res.data));
      let arr = [];
      p.data.subs.map(s => arr.push(s._id));
      console.log('FROM ARRAY ==> ', arr);
      setArrayOfSubs(prev => arr); // required for ant design select to work
    });
  };

  const loadCategories = () =>
    getCategories().then(c => {
      console.log('Get CATEGORIES IN UPDATE PRODUCT ==> ', c.data);
      setCategories(c.data);
    });

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, '===> ', e.target.value);
  };

  const handleCategoryChange = e => {
    e.preventDefault();
    console.log('CATEGORY CLICKED ===> ', e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then(res => {
      console.log('Sub option on category clicked', res);
      setSubOptions(res.data);
    });

    console.log('EXISTING CATEGORY', values.category);

    // if user clicks back to the original category
    // show it's subcategories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubs([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger" />
          ) : (
            <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>
              Product Update
            </h4>
          )}
          {/* {JSON.stringify(values)} */}
          <hr />
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
