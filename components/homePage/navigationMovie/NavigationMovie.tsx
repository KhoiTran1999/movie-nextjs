"use client";

import Link from "next/link";
import NavigationFeature from "./NavigationFeature";
import User from "./User";
import { SuspenseComp } from "@/components/wrapper/SuspenseComp";
import { usePathname } from "next/navigation";
import { Logo } from "@/public/logo";
import { Search } from "@/public/search";

const NavigationMovie = () => {
  const pathname = usePathname();

  return (
    <>
      {!pathname.includes("admin") && (
        <div
          className={`${
            true
              ? "bg-gradient-to-b from-black to-transparent backdrop-blur-none"
              : "bg-black/20 backdrop-blur-lg"
          } fixed left-0 top-0 z-[100] w-full px-4 pt-1 transition-all lg:px-12`}
        >
          <div className="m-auto flex w-full max-w-[1200px] items-center justify-between ">
            <Link href="/" aria-label="Home Page">
              <Logo />
            </Link>
            <div className="hidden md:block">
              <SuspenseComp>
                <NavigationFeature />
              </SuspenseComp>
            </div>
            <div className="flex items-center justify-end pr-5">
              <Link href={"/search"} aria-label="Search Page">
                <Search />
              </Link>
              <User />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationMovie;
