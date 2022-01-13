import React, { useEffect, useState } from 'react';
import AdminProductCard from '../../components/cards/AdminProductCard';
import AdminNav from '../../components/nav/AdminNav';
import { getProductsByCount } from '../../functions/product';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col-md-10" style={{ marginTop: '15px' }}>
            {loading ? (
              <h4 className="text-success">Loading...</h4>
            ) : (
              <>
                <h4>All Products</h4>
                <hr />
              </>
            )}
            <div className="row">
              {products.map(product => (
                <div
                  key={product._id}
                  className="col-md-4"
                  style={{ marginTop: '15px', marginBottom: '15px' }}
                >
                  <AdminProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;