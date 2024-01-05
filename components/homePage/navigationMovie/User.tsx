"use client";

import React from "react";
import { Dropdown, Divider, theme, Avatar, Tooltip } from "antd";
import type { MenuProps } from "antd";

const { useToken } = theme;
import {
  UserOutlined,
  PlusOutlined,
  StarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <div>
        <Link href="/account">My Account</Link>
      </div>
    ),
    icon: <UserOutlined />,
  },
  {
    key: "2",
    label: (
      <div>
        <Link href="/watchList">Watchlist</Link>
      </div>
    ),
    icon: <PlusOutlined />,
  },
  {
    key: "3",
    label: (
      <div>
        <Link href="/subscription">Subscription</Link>
      </div>
    ),
    icon: <StarOutlined />,
  },
];

const User = () => {
  const { token } = useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    padding: "10px",
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
  };
  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          <div className="flex items-center ">
            <Avatar src="/avatar.jpg" size="large" />
            <span className="max-w-[100px] font-semibold text-base ml-4 overflow-hidden text-ellipsis">
              Peter
            </span>
          </div>
          <Divider
            style={{ margin: "10px 0px" }}
            className="border-gray-500 border-1"
          />
          {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
          <Divider
            style={{ margin: "10px 0px" }}
            className="border-gray-500 border-1"
          />
          <div className="flex justify-center items-center cursor-pointer">
            <LogoutOutlined className="text-lg mr-2" />
            <span className="hover:text-[#E50914] font-medium">Logout</span>
          </div>
        </div>
      )}
    >
      <Tooltip title="Account">
        <UserOutlined className="text-[#D1D0CF] text-xl cursor-pointer ml-5" />
      </Tooltip>
    </Dropdown>
  );
};

export default User;
