import React from 'react';
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.jpg';

const ProductCartInCheckout = ({ p }) => {
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '80px', height: 'auto' }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>{p.color}</td>
        <td>{p.count}</td>
        <td>Shipping Icon</td>
        <td>Delete Icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCartInCheckout;