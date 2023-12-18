"use client";

import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const SearchMovie = () => {
  const [searchFocus, setsearchFocus] = useState(false);

  return (
    <form action="" className="flex justify-end items-center">
      <input
        className={`${
          searchFocus ? "w-full border-[#E50914]" : "w-0 border-transparent"
        } mr-3 p-1 rounded bg-transparent text-white border  outline-none transition-all`}
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
