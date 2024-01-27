import Image from "next/image";
import Link from "next/link";
import NavigationFeature from "./NavigationFeature";
import SearchMovie from "./SearchMovie";
import User from "./User";

const NavigationMovie = () => {
  return (
    <div
      className={`${
        true
          ? "bg-gradient-to-b from-black to-transparent backdrop-blur-none"
          : "bg-black/20 backdrop-blur-lg"
      } w-full pt-1 px-12  fixed z-[100] top-0 left-0 transition-all`}
    >
      <div className="flex justify-between items-center max-w-[1200px] w-full m-auto ">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={100} height={50} />
        </Link>
        <div>
          <NavigationFeature />
        </div>
        <div className="pr-5 flex justify-end items-center">
          <SearchMovie />
          <User />
        </div>
      </div>
    </div>
  );
};

export default NavigationMovie;
