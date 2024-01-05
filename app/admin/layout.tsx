"use client";

import HeaderAdmin from "@/components/layout/header/HeaderAdmin";
import SiderAdmin from "@/components/layout/sider/SiderAdmin";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { Introduction } from "@/components/introduction/Introduction";

const layoutStyle = {
  with: "100svh",
  height: "100svh",
};

export default function layout({ children }: { children: React.ReactNode }) {
  const [firstLoading, setFirstLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {firstLoading ? (
        <Introduction />
      ) : (
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
      )}
    </>
  );
}
