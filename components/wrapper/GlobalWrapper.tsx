"use client";

import { Providers } from "@/utils/redux/provider";
import { ConfigProvider } from "antd";
import React from "react";

const GlobalWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#E50914",
            colorBgElevated: "#141314",
            colorBgTextHover: "#E50914",
            colorText: "#D1D0CF",
            colorPrimaryActive: "#D1D0CF",
            colorPrimaryBg: "#D1D0CF",
          },
        }}
      >
        <div className="overflow-hidden">{children}</div>
      </ConfigProvider>
    </Providers>
  );
};

export default GlobalWrapper;
