"use client";

import React from "react";
import { homeItems } from "@/constant/homeItem";
import { Menu, theme } from "antd";

const Navigation = () => {
  return (
    <Menu
      items={homeItems}
      mode="horizontal"
      selectedKeys={["1"]}
      style={{
        fontWeight: 600,
        fontSize: 16,
      }}
    />
  );
};

export default Navigation;
