import React from 'react';

const LocalSearch = ({ keyword, setKeyword }) => {
  // Step 3
  const handleSearchChange = e => {
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <input
      type="search"
      placeholder="Filter"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control"
      style={{ marginBottom: '1.5rem' }}
    />
  );
};

export default LocalSearch;
