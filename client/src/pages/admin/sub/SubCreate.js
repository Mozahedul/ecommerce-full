import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForms from '../../../components/forms/CategoryForms';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories } from '../../../functions/category';
import { createSub, removeSub, getSubs } from '../../../functions/sub';

const SubCreate = () => {
  const { user } = useSelector(state => ({ ...state }));
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subs, setSubs] = useState([]);
  // Step 1
  const [keyword, setKeyword] = useState('');

  console.log(categories);

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () => getCategories().then(c => setCategories(c.data));
  const loadSubs = () => getSubs().then(s => setSubs(s.data));

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then(res => {
        console.log(res);
        setLoading(false);
        setName('');
        toast.success(`The Sub Category "${res.data.name}" has been created`);
        loadSubs();
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
      removeSub(slug, user.token)
        .then(res => {
          setLoading(false);
          toast.success(`The Sub category "${res.data.name}" deleted`);
          loadSubs();
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
              <h4>Create sub category</h4>
            )}

            <div className="form-group">
              <label>Parent Category</label>
              <select
                name="category"
                className="form-control"
                onChange={e => setCategory(e.target.value)}
              >
                <option>Please select</option>
                {categories.length > 0 &&
                  categories.map(c => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            {JSON.stringify(category)}

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
            {subs.filter(searched(keyword)).map(s => (
              <div
                className="alert alert-secondary row"
                role="alert"
                key={s._id}
              >
                <span className="col-md">{s.name}</span>
                <span className="col-md" style={{ textAlign: 'right' }}>
                  <span
                    className="btn btn-sm btn-info"
                    title="Delete Category"
                    onClick={() => handleRemove(s.slug)}
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>

                  <Link
                    to={`/admin/sub/${s.slug}`}
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

export default SubCreate;
