import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const [showSub, setShowSub] = useState(false);
  const [categories, setCategories] = useState([]);

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
      setValues({ ...values, ...p.data });
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
    // console.log('CATEGORY CLICKED ===> ', e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then(res => {
      console.log('Sub option on category clicked', res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Update</h4>
          {JSON.stringify(values)}
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
