import {Menu} from "antd";
import React from "react";
import {ProfileOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons/lib";
import {Link} from "react-router-dom";

export function MainMenu(): JSX.Element {
    return <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
                <Link to="/">
                    <ProfileOutlined/>
                    <span>Projects</span>
                </Link>
            </Menu.Item>
        <Menu.Item key="2">
            <UserOutlined/>
            <span>Users</span>
        </Menu.Item>
        <Menu.Item key="3">
            <SettingOutlined/>
            <span>Settings</span>
        </Menu.Item>
    </Menu>;
}
