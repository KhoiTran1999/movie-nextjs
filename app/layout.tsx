import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/antd.registry";
import GlobalWrapper from "@/components/wrapper/GlobalWrapper";
import { ClerkProvider } from "@clerk/nextjs";

const nunito = Nunito({ subsets: ["latin"] });

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
    <ClerkProvider>
      <html lang="en" className="select-none">
        <body className={nunito.className}>
          <StyledComponentsRegistry>
            <GlobalWrapper>{children}</GlobalWrapper>
          </StyledComponentsRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
