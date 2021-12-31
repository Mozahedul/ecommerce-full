import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { getCategory, updateCategory } from '../../../functions/category';
import CategoryForms from '../../../components/forms/CategoryForms';

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector(state => ({ ...state }));
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then(c => setName(c.data.name));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`The category "${res.data.name}" has been updated`);
        history.push('/admin/category');
      })
      .catch(err => {
        setLoading(false);
        console.log('error happens', err);
        if (err.status === 400) {
          toast.error('Error happens');
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update Category</h4>
          )}
          <CategoryForms
            handleSubmit={handleSubmit}
            setName={setName}
            name={name}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
