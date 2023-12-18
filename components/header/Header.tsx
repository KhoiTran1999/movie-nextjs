import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";
import SearchMovie from "./SearchMovie";
import User from "./User";

const Header = () => {
  return (
    <div className="w-full p-4 bg-black/50 backdrop-blur-lg flex justify-between items-center fixed z-10 top-0 left-0">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={153} height={38} />
      </Link>
      <div className="w-[400px]">
        <Navigation />
      </div>
      <div className="w-[400px] pr-5 flex justify-end items-center">
        <SearchMovie />
        <User />
      </div>
    </div>
  );
};

export default Header;
