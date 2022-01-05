import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { createProduct } from '../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductCreateForm from '../../components/forms/ProductCreateForm';
import { getCategories } from '../../functions/category';

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product category</h4>
          <hr />
          {JSON.stringify(values.categories)}
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
