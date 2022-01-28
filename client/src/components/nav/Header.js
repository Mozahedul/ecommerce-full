import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge, Menu } from 'antd';
import firebase from 'firebase/compat/app';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Search from '../forms/Search';

const { SubMenu, Item } = Menu;

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state);
  const history = useHistory();
  const [current, setCurrent] = useState('home');
  const { cart } = useSelector(state => ({ ...state }));

  // console.log('From user:', JSON.stringify(user && user.email));

  const handleClick = e => {
    setCurrent(e.key);
  };

  const logout = e => {
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
      <Menu.ItemGroup>
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home </Link>
        </Item>
      </Menu.ItemGroup>

      <Menu.ItemGroup>
        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop </Link>
        </Item>
      </Menu.ItemGroup>

      <Menu.ItemGroup>
        <Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart" style={{ paddingTop: '2px' }}>
            <Badge count={cart.length} offset={[9, 0]}>
              Cart
            </Badge>
          </Link>
        </Item>
      </Menu.ItemGroup>

      {user ? (
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.name}>
          <Menu.ItemGroup>
            {user && user.role === 'subscriber' && (
              <Item key="userHistory">
                <Link to="/user/history">Dashboard</Link>
              </Item>
            )}

            {user && user.role === 'admin' && (
              <Item key="dashboard">
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}

            <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </Menu.ItemGroup>
        </SubMenu>
      ) : (
        <>
          <Item key="login" icon={<UserOutlined />}>
            <Link to="/login">Login</Link>
          </Item>
          <Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Item>
        </>
      )}

      <span style={{ marginLeft: 'auto', paddingRight: '4px' }}>
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
