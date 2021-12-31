import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category';

const CategoryCreate = () => {
  const { user } = useSelector(state => ({ ...state }));
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  console.log(categories);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => getCategories().then(c => setCategories(c.data));

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then(res => {
        console.log(res);
        setLoading(false);
        setName('');
        toast.success(`The Category "${res.data.name}" is created`);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          required
        />
        <button
          type="submit"
          className="btn btn-outline-primary"
          style={{ marginTop: '20px' }}
        >
          Save
        </button>
      </div>
    </form>
  );
  return (
    <>
      <div className="container-fluid" style={{ marginTop: '20px' }}>
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>Create category</h4>
            )}
            {categoryForm()}
            <hr />
            {JSON.stringify(categories)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;
