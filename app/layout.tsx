import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stream Movie - The fastest stream movie in the world",
  description: "The fastest stream movie in the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#E50914",
            colorBgElevated: "#141314",
            colorBgBase: "black",
            colorBgTextHover: "#E50914",
            colorText: "#D1D0CF",
            colorPrimaryActive: "#D1D0CF",
            colorPrimaryBg: "#D1D0CF",
          },
        }}
      >
        <body className={inter.className}>{children}</body>
      </ConfigProvider>
    </html>
  );
}
