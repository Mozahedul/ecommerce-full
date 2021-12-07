import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
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
        Home
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
        Register
      </Item>
      <Item key="login" icon={<UserOutlined />}>
        Login
      </Item>
    </Menu>
  );
};

export default Header;
