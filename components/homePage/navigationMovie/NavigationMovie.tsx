import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";
import SearchMovie from "./SearchMovie";
import User from "./User";
import { useEffect, useState } from "react";

const NavigationMovie = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    window.onscroll = () => {
      if (document.documentElement.scrollTop === 0) setIsTop(true);
      else setIsTop(false);
    };
  });

  return (
    <div
      className={`${
        isTop
          ? "bg-gradient-to-b from-black to-transparent backdrop-blur-none"
          : "bg-black/20 backdrop-blur-lg"
      } w-full p-4 px-12 flex justify-between items-center fixed z-[100] top-0 left-0 transition-all`}
    >
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={100} height={50} />
      </Link>
      <div>
        <Navigation />
      </div>
      <div className="pr-5 flex justify-end items-center">
        <SearchMovie />
        <User />
      </div>
    </div>
  );
};

export default NavigationMovie;
