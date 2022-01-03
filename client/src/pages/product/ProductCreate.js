import React from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { createProduct } from '../../functions/product';

const ProductCreate = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">Product create form</div>
      </div>
    </div>
  );
};

export default ProductCreate;
