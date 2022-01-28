import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';

const SubList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then(res => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    categories.map(s => (
      <div
        key={s._id}
        className="col-md btn btn-outlined-primary btn-lg btn-block btn-raised"
        style={{ marginRight: '10px' }}
      >
        <Link to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
