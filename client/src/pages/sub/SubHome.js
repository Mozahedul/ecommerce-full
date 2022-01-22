import React, { useEffect } from 'react';
import { useState } from 'react';
import ProductCard from '../../components/cards/ProductCard';
import { getSub } from '../../functions/sub';

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  console.log('Sub Category ===> ', sub);
  console.log('Products ===> ', products);

  useEffect(() => {
    setLoading(true);
    getSub(slug).then(res => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.subcategory);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md-12"
          style={{ textAlign: 'center', marginTop: '30px' }}
        >
          {loading ? (
            <h4 className="jumbotron" style={{ fontSize: '2rem' }}>
              Loading...
            </h4>
          ) : (
            <h4
              className="jumbotron"
              style={{ fontSize: '2rem' }}
            >{`${products.length} products in "${sub.name}" Sub category`}</h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map(p => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHome;
