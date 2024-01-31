import Image from "next/image";
import Link from "next/link";
import NavigationFeature from "./NavigationFeature";
import User from "./User";

const NavigationMovie = () => {
  return (
    <div
      className={`${
        true
          ? "bg-gradient-to-b from-black to-transparent backdrop-blur-none"
          : "bg-black/20 backdrop-blur-lg"
      } fixed left-0 top-0  z-[100] w-full px-4 pt-1 transition-all lg:px-12`}
    >
      <div className="m-auto flex w-full max-w-[1200px] items-center justify-between ">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={100} height={50} />
        </Link>
        <div className="hidden md:block">
          <NavigationFeature />
        </div>
        <div className="flex items-center justify-end pr-5">
          <i className="fa-regular fa-magnifying-glass cursor-pointer text-xl text-[#D1D0CF]"></i>
          <User />
        </div>
      </div>
    </div>
  );
};

export default NavigationMovie;
