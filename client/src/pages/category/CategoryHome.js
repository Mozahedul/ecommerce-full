import React, { useEffect } from 'react';
import { useState } from 'react';
import { getCategory } from '../../functions/category';

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then(c => {
      console.log(JSON.stringify(c.data, null, 4));
      setCategory(c.data);
    });
  }, [slug]);

  return <div>{slug}</div>;
};

export default CategoryHome;
