"use client";

import HeaderAdmin from "@/components/layout/header/HeaderAdmin";
import SiderAdmin from "@/components/layout/sider/SiderAdmin";
import { Layout } from "antd";

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  with: "100svh",
  height: "100svh",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Layout style={layoutStyle}>
        <SiderAdmin />
        <Layout>
          <HeaderAdmin />
          <div className="p-8 bg-[#001529] w-full h-full overflow-y-auto">
            {children}
          </div>
        </Layout>
      </Layout>
    </div>
  );
}
