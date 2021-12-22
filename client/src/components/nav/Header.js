import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const { SubMenu, Item } = Menu;

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const history = useHistory();
  const [current, setCurrent] = useState('home');

  console.log('From user:', JSON.stringify(user && user.email));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = (e) => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{ width: '100%' }}
      key="menu"
    >
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/"> Home </Link>
      </Item>

      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
        <Menu.ItemGroup>
          <Item key="option1">Option 1</Item>
          <Item key="option2">Option 2</Item>
          <Item key="option3" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </Menu.ItemGroup>
      </SubMenu>

      <Item key="login" icon={<UserOutlined />} style={{ marginLeft: 'auto' }}>
        <Link to="/login">Login</Link>
      </Item>
      <Item key="register" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>
    </Menu>
  );
};

export default Header;
