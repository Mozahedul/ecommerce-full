import { Card, Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import laptop from '../../images/laptop.jpg';
import { Link } from 'react-router-dom';

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector(state => ({ ...state }));

  const imageStyle = {
    width: '100%',
    height: '100px',
    '-o-object-fit': 'cover',
    'object-fit': 'cover',
    // paddingBottom: '45px',
  };

  return (
    <Drawer
      className="text-center"
      title={<h3>Cart / {cart.length} Product</h3>}
      placement="right"
      closable={false}
      onClose={() => {
        dispatch({ type: 'SET_VISIBLE', payload: false });
      }}
      visible={drawer}
    >
      {cart.map(p => (
        <Card
          className="m-b-2"
          cover={
            p.images[0] ? (
              <img src={p.images[0].url} alt={p.title} style={imageStyle} />
            ) : (
              <img src={laptop} alt={p.title} style={imageStyle} />
            )
          }
        >
          <Card.Meta title={p.title} />
        </Card>
      ))}
      <Link to="/cart">
        <button
          className="btn btn-primary btn-raised btn-block"
          onClick={() => dispatch({ type: 'SET_VISIBLE', payload: false })}
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
