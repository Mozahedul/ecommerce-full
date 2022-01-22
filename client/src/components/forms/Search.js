import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector(state => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = e => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        placeholder="Search"
        className="form-control"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointe' }} />
    </form>
  );
};

export default Search;
