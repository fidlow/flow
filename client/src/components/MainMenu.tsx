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
import { RoleStoreType } from "../store/RoleStore";

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
      {(user?.roles as RoleStoreType[]).some(r => r.id === 1) ?
          <Menu.Item key="/accounts">
            <Link to="/accounts">
              <UserOutlined />
              <span>Accounts</span>
            </Link>
          </Menu.Item>
        : null}
      <Menu.Item key="/settings">
          <Link to="/settings">
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
