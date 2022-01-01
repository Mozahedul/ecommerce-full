import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CategoryForms from '../../../components/forms/CategoryForms';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
  const { user } = useSelector(state => ({ ...state }));
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // Step 1
  const [keyword, setKeyword] = useState('');

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
        loadCategories();
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async slug => {
    const answer = window.confirm('Delete?');
    if (answer) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then(res => {
          setLoading(false);
          toast.success(`The category "${res.data.name}" deleted`);
          loadCategories();
        })
        .catch(err => {
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  // Step 4
  // Here includes check the keyword; if exists, then returns true
  const searched = keyword => c => c.name.toLowerCase().includes(keyword);

  return (
    <>
      <div className="container-fluid" style={{ marginTop: '20px' }}>
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>Create category</h4>
            )}
            <CategoryForms
              handleSubmit={handleSubmit}
              setName={setName}
              name={name}
            />

            {/* Step 2 */}
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {/* Step 5 - include searched function before the map.
            Here, filter() is a higher order function, will take a callback function. We put the callback function inside the higher order function of searched function.
            */}
            {categories.filter(searched(keyword)).map(c => (
              <div
                className="alert alert-secondary row"
                role="alert"
                key={c._id}
              >
                <span className="col-md">{c.name}</span>
                <span className="col-md" style={{ textAlign: 'right' }}>
                  <span
                    className="btn btn-sm btn-info"
                    title="Delete Category"
                    onClick={() => handleRemove(c.slug)}
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>

                  <Link
                    to={`/admin/category/${c.slug}`}
                    className="btn btn-sm"
                    title="Edit Category"
                  >
                    <span>
                      <EditOutlined className="text-warning" />
                    </span>
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;
