import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  values,
  setValues,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
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

  console.log(categories);
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
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <br />
      <div className="form-group">
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          placeholder="Please select"
          className="form-control"
          value={arrayOfSubs}
          onChange={value => setArrayOfSubs(value)}
        >
          {subOptions.length > 0 &&
            subOptions.map(s => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-outline btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductUpdateForm;
