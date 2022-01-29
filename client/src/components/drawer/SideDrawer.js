import { Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector(state => ({ ...state }));

  return <Drawer visible={true}>{JSON.stringify(cart)}</Drawer>;
};

export default SideDrawer;
