import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { createProduct } from '../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductCreateForm from '../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../functions/category';

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
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
const ProductCreate = ({ history }) => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  // redux
  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then(c => setValues({ ...values, categories: c.data }));

  const handleSubmit = e => {
    e.preventDefault();
    createProduct(values, user.token)
      .then(res => {
        console.log(res);
        toast.success(`"${res.data.title}" has been created`);
        history.push('/admin/products');
      })
      .catch(err => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, '===> ', e.target.value);
  };

  const handleCategoryChange = e => {
    e.preventDefault();
    console.log('CATEGORY CLICKED ===> ', e.target.value);
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
          <h4>Product Create</h4>
          <hr />
          {JSON.stringify(values.subs)}
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            showSub={showSub}
            subOptions={subOptions}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
