"use client";

import { Providers } from "@/utils/redux/provider";
import { ConfigProvider } from "antd";
import NavigationMovie from "../homePage/navigationMovie/NavigationMovie";

const GlobalWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
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
            colorBgContainer: "transparent",
            colorBgBase: "transparent",
            colorBgElevated: "transparent",
            controlItemBgActive: "#e0dfdf26",
            controlItemBgActiveHover: "#e0dfdf26",
          },
          Button: {
            colorBgContainer: "transparent",
          },
          Input: {
            colorBgContainer: "transparent",
            colorTextPlaceholder: "#7f7f7f",
            colorTextDisabled: "#D1D0CF",
          },
          InputNumber: {
            colorBgContainer: "transparent",
            colorTextPlaceholder: "#7f7f7f",
            handleBg: "white",
            colorTextDisabled: "#D1D0CF",
          },
          DatePicker: {
            colorBgContainer: "transparent",
            colorTextPlaceholder: "#7f7f7f",
            colorTextDisabled: "#494848",
            colorIcon: "#494848",
          },
          Select: {
            multipleItemBg: "#494848",
            colorTextDisabled: "#D1D0CF",
            colorTextPlaceholder: "#7f7f7f",
          },
          Dropdown: {
            controlItemBgActive: "#2d2c2d",
            controlItemBgActiveHover: "#2d2c2d",
            controlItemBgHover: "#2d2c2d",
          },
          Steps: {
            colorText: "red",
            colorTextDisabled: "white",
            colorTextDescription: "white",
          },
          Message: {
            colorText: "white",
          },
          List: {
            colorText: "white",
          },
          Spin: {
            colorWhite: "red",
          },
        },
      }}
    >
      <Providers>
        <div>
          <NavigationMovie />
          {children}
        </div>
      </Providers>
    </ConfigProvider>
  );
};

export default GlobalWrapper;
