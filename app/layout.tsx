import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import GlobalWrapper from "@/components/wrapper/GlobalWrapper";

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
    <html lang="en" className="select-none overflow-x-hidden">
      <body className={inter.className}>
        <GlobalWrapper>{children}</GlobalWrapper>
      </body>
    </html>
  );
}
