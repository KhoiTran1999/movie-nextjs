"use client";

import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const SearchMovie = () => {
  const [searchFocus, setsearchFocus] = useState(false);

  return (
    <form action="" className="flex justify-end items-center relative">
      <input
        className={`${
          searchFocus
            ? "w-[230px] h-[34px] border-[white] bg-[#000000c1]"
            : "w-0 h-0 border-transparent bg-transparent"
        } absolute right-[15px] mr-3 p-1 rounded text-white border outline-none transition-all`}
        placeholder="Search Movie"
        type="search"
        id="search"
        onFocus={(e) => setsearchFocus(true)}
        onBlur={(e) => setsearchFocus(false)}
      />
      <label htmlFor="search">
        <SearchOutlined className="text-[#D1D0CF] text-xl cursor-pointer" />
      </label>
    </form>
  );
};

export default SearchMovie;
