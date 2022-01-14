import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';
import { getProduct } from '../../../functions/product';
// import { useParams } from 'react-router-dom';

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

const ProductUpdate = ({ match }) => {
  const { user } = useSelector(state => ({ ...state }));
  const [values, setValues] = useState(initialState);

  console.log(values);

  // const { slug } = useParams();
  // console.log(useParams());

  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then(p => {
      // console.log('single product ==> ', p);
      setValues({ ...values, ...p.data });
    });
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
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
