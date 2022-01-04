import React from 'react';

const ProductCreateForm = ({ handleSubmit, handleChange, values }) => {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
          autoFocus
        />
      </div>
      <br />
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Shipping</label>
        <select
          className="form-control"
          name="shipping"
          onChange={handleChange}
          value={shipping}
        >
          <option>Please select</option>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      <br />
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Color</label>
        <select
          className="form-control"
          name="color"
          value={color}
          onChange={handleChange}
        >
          <option>Please select</option>
          {colors.map(color => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div className="form-group">
        <label>Brand</label>
        <select
          className="form-control"
          name="brand"
          value={brand}
          onChange={handleChange}
        >
          <option>Please select</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div className="form-group">
        <button type="submit" className="btn btn-outline btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductCreateForm;
