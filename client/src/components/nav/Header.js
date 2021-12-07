import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{ width: '100%' }}
    >
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/"> Home</Link>
      </Item>

      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
        <Menu.ItemGroup title="Item 1">
          <Item key="option1">Option 1</Item>
          <Item key="option2">Option 2</Item>
        </Menu.ItemGroup>
      </SubMenu>

      <Item
        key="register"
        icon={<UserAddOutlined />}
        style={{ marginLeft: 'auto' }}
      >
        <Link to="/register">Register</Link>
      </Item>

      <Item key="login" icon={<UserOutlined />}>
        <Link to="/login">Login</Link>
      </Item>
    </Menu>
  );
};

export default Header;
