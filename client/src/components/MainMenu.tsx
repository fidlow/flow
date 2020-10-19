import { Menu } from "antd";
import React from "react";
import {
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons/lib";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "./StoreProvider";
import { MenuInfo } from "rc-menu/lib/interface";

export function MainMenu(): JSX.Element {
  const location = useLocation();
  const { userStore: {user} } = useStore();
  const handleClick = (val: MenuInfo) => {
    if(val.key === '/logout') {
      user?.remove();
    }
  }
  return (
    <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" onClick={handleClick}>
      <Menu.Item key="/">
        <Link to="/">
          <ProfileOutlined />
          <span>Projects</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/account">
        <Link to="/account">
          <UserOutlined />
          <span>Accounts</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/setting">
        <SettingOutlined />
        <span>Settings</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/logout">
        <LogoutOutlined />
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
}
