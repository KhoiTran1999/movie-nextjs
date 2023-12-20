"use client";

import {
  CaretRightFilled,
  PlusOutlined,
  LikeOutlined,
  FireFilled,
} from "@ant-design/icons";
import { useState } from "react";

type movieProprs = {
  movieUrl: string;
};

const CardMovie = ({ movieUrl }: movieProprs) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`mr-2 inline-block rounded hover:z-10 z-0 hover:scale-125 transition-all duration-700 hover:shadow-[rgba(0,_0,_0,_0.9)_0px_3px_8px]`}
    >
      <div className="relative">
        <img
          src={movieUrl}
          alt="thumbnail"
          className="w-[233px] object-cover h-[133px] rounded-t"
        />
        <span
          className={`${
            isHover ? "opacity-100" : "opacity-0"
          } absolute transition-all hover:scale-110 hover:bg-red-700 bg-[#E50914] bottom-2 right-2 w-3 h-3 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
        >
          <CaretRightFilled />
        </span>
        <span
          className={`${
            isHover ? "opacity-100" : "opacity-0"
          } absolute transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 bottom-2 right-11 w-3 h-3 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
        >
          <PlusOutlined />
        </span>
        <span
          className={`${
            isHover ? "opacity-100" : "opacity-0"
          } absolute transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 bottom-2 right-20 w-3 h-3 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
        >
          <LikeOutlined />
        </span>
        <div
          className={`${
            isHover ? "visible opacity-100" : "invisible opacity-0"
          } bg-[#141414] w-full absolute z-100 p-3 shadow-[rgba(0,_0,_0,_0.9)_0px_3px_8px] transition-all duration-700`}
        >
          <h2 className="text-sm font-bold">Love in Seoul</h2>
          <span className="mr-3 text-xs">1h30p</span>
          <span className="text-xs">3 seasons</span>
          <ul className="flex items-center text-xs flex-wrap">
            {Array.from({ length: 5 }, (_, idx) => {
              if (idx + 1 < 5) {
                return (
                  <li className="mr-2" key={idx}>
                    <span className="mr-2 hover:text-[#E50914] cursor-pointer">
                      Lý thú
                    </span>
                    <FireFilled className="text-xs text-[#E50914]" />
                  </li>
                );
              }
              return (
                <li className="mr-2" key={idx}>
                  <span className=" hover:text-[#E50914] cursor-pointer">
                    Hành động
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardMovie;
