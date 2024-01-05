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
          components: {
            Table: {
              rowHoverBg: "#e0dfdf26",
            },
          },
        }}
      >
        <link
          rel="stylesheet"
          data-purpose="Layout StyleSheet"
          title="Web Awesome"
          href="/css/app-wa-9846671ed7c9dd69b10c93f6b04b31fe.css?vsn=d"
        />

        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css"
        />

        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-thin.css"
        />

        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-solid.css"
        />

        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-regular.css"
        />

        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-light.css"
        />
        <div className="overflow-hidden">{children}</div>
      </ConfigProvider>
    </Providers>
  );
};

export default GlobalWrapper;
