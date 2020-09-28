import { Menu } from "antd";
import React from "react";
import {
  LogoutOutlined,
  ProfileOutlined,
  // SettingOutlined,
  UserOutlined,
} from "@ant-design/icons/lib";
import { Link, useLocation } from "react-router-dom";

export function MainMenu(): JSX.Element {
  const location = useLocation();
  return (
    <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
      <Menu.Item key="/">
        <Link to="/">
          <ProfileOutlined />
          <span>Projects</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/account">
        <Link to="/account">
          <UserOutlined />
          <span>My Account</span>
        </Link>
      </Menu.Item>
      {/*<Menu.Item key="3">*/}
      {/*  <SettingOutlined />*/}
      {/*  <span>Settings</span>*/}
      {/*</Menu.Item>*/}
      <Menu.Item key="4">
        <LogoutOutlined />
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
}
