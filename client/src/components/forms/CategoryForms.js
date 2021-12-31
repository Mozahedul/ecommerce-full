import React from 'react';

const CategoryForms = ({ handleSubmit, setName, name }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          onChange={e => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <button type="submit" className="btn btn-outline-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default CategoryForms;
