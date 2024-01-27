"use client";

import { Menu } from "antd";
import { homeItems } from "@/constant/homeItem";
import { usePathname } from "next/navigation";

const NavigationFeature = () => {
  const pathname = usePathname();

  return (
    <Menu
      items={homeItems}
      mode="horizontal"
      selectedKeys={[pathname]}
      style={{
        fontWeight: 600,
        fontSize: 16,
        backgroundColor: "transparent",
      }}
    />
  );
};

export default NavigationFeature;
