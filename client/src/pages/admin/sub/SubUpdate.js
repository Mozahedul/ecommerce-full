import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CategoryForms from '../../../components/forms/CategoryForms';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories } from '../../../functions/category';
import { getSub, updateSub } from '../../../functions/sub';

const SubUpdate = ({ history, match }) => {
  const { user } = useSelector(state => ({ ...state }));
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState('');

  console.log(categories);

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () => getCategories().then(c => setCategories(c.data));
  const loadSub = () =>
    getSub(match.params.slug).then(s => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then(res => {
        console.log(res);
        setLoading(false);
        setName('');
        toast.success(`The Sub Category "${res.data.name}" has been Updated`);
        history.push('/admin/sub');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

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
              <h4>Update sub category</h4>
            )}

            <div className="form-group">
              <label>Parent Category</label>
              <select
                name="category"
                className="form-control"
                onChange={e => setParent(e.target.value)}
              >
                <option>Please select</option>
                {categories.length > 0 &&
                  categories.map(c => (
                    <option
                      key={c._id}
                      value={c._id}
                      selected={c._id === parent}
                    >
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <CategoryForms
              handleSubmit={handleSubmit}
              setName={setName}
              name={name}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubUpdate;
