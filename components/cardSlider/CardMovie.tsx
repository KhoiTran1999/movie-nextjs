"use client";

import {
  CaretRightFilled,
  PlusOutlined,
  LikeOutlined,
  FireFilled,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

type movieProprs = {
  movieUrl: string;
};

const CardMovie = ({ movieUrl }: movieProprs) => {
  const [isHovered, setIsHovered] = useState(false);
  const [delayTimeout, setDelayTimeout] = useState<any>(null);

  const handleOnMouseEnter = () => {
    const timeoutId: any = setTimeout(() => {
      setIsHovered(true);
    }, 500);

    setDelayTimeout(timeoutId);
  };
  const onMouseLeave = () => {
    clearTimeout(delayTimeout);
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${
        isHovered
          ? "z-10 scale-125 shadow-[rgba(0,_0,_0,_0.9)_0px_3px_8px]"
          : "z-0"
      } w-[19%] mx-2 inline-block rounded transition-all duration-700 cursor-pointer`}
    >
      <div className="relative">
        {isHovered ? (
          <ReactPlayer
            url={"https://www.youtube.com/watch?v=nS12Fbtgr5A"}
            loop
            muted
            playing
            width={"100%"}
            height={"20svh"}
            style={{
              objectFit: "cover",
            }}
          />
        ) : (
          <img
            loading="lazy"
            src={movieUrl}
            alt="thumbnail"
            className={`${
              isHovered ? "rounded-t-md" : "rounded-md"
            } w-full h-[20svh] object-cover`}
          />
        )}

        <span
          className={`${
            isHovered ? "opacity-100" : "opacity-0"
          } absolute transition-all hover:scale-110 hover:bg-red-700 bg-[#E50914] bottom-2 right-2 w-3 h-3 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
        >
          <CaretRightFilled />
        </span>
        <span
          className={`${
            isHovered ? "opacity-100" : "opacity-0"
          } absolute transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 bottom-2 right-11 w-3 h-3 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
        >
          <PlusOutlined />
        </span>
        <span
          className={`${
            isHovered ? "opacity-100" : "opacity-0"
          } absolute transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 bottom-2 right-20 w-3 h-3 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
        >
          <LikeOutlined />
        </span>
        <div
          className={`${
            isHovered ? "visible opacity-100" : "invisible opacity-0"
          } bg-[#141414] w-full absolute z-100 p-3 shadow-[rgba(0,_0,_0,_0.9)_0px_3px_8px] transition-all rounded-b-md duration-700`}
        >
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
