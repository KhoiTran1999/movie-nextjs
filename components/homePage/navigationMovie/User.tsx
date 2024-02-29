"use client";

import React from "react";
import { Dropdown, Divider, theme, Avatar } from "antd";
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
        <Link style={{ color: "#D1D0CF" }} href="/admin">
          My Account
        </Link>
      </div>
    ),
    icon: <UserOutlined />,
  },
  {
    key: "2",
    label: (
      <div>
        <Link style={{ color: "#D1D0CF" }} href="/watchList">
          Watchlist
        </Link>
      </div>
    ),
    icon: <PlusOutlined />,
  },
  {
    key: "3",
    label: (
      <div>
        <Link style={{ color: "#D1D0CF" }} href="/subscription">
          Subscription
        </Link>
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
            <span className="ml-4 max-w-[100px] overflow-hidden text-ellipsis text-base font-semibold">
              Admin
            </span>
          </div>
          <Divider
            style={{ margin: "10px 0px" }}
            className="border-1 border-gray-500"
          />
          {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
          <Divider
            style={{ margin: "10px 0px" }}
            className="border-1 border-gray-500"
          />
          <div className="group flex cursor-pointer items-center justify-center">
            <LogoutOutlined className="fa-regular fa-arrow-right-from-bracket mr-2 text-lg group-hover:text-[#E50914]" />
            <span className="font-medium group-hover:text-[#E50914]">
              Logout
            </span>
          </div>
        </div>
      )}
    >
      <i className="fa-light fa-user ml-5 cursor-pointer text-xl text-[#D1D0CF]"></i>
    </Dropdown>
  );
};

export default User;
