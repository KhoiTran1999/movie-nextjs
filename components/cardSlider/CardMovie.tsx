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
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [delayTimeout, setDelayTimeout] = useState<any>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const handleOnMouseEnter = () => {
    const timeoutId: any = setTimeout(() => {
      setIsHovered(true);
    }, 700);

    setDelayTimeout(timeoutId);
  };
  const onMouseLeave = () => {
    clearTimeout(delayTimeout);
    setIsHovered(false);
    setIsReady(false);
  };

  return (
    <div
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${
        isHovered
          ? "z-50 scale-[1.5] shadow-[rgba(0,_0,_0,_0.9)_0px_3px_8px]"
          : "z-10"
      } relative w-[19%] mx-2 inline-block rounded transition-all duration-500 cursor-pointer`}
    >
      <div className="relative">
        <div className="w-full h-full overflow-hidden rounded-t-md">
          <div className="relative after:content-[''] after:w-full after:h-full after:absolute after:top-0 after:left-0">
            <ReactPlayer
              url={
                isHovered ? "https://www.youtube.com/watch?v=nS12Fbtgr5A" : ""
              }
              loop={true}
              playing
              controls={false}
              muted
              width={isReady ? "100%" : "0px"}
              height={isReady ? "20svh" : "0px"}
              onReady={() => setIsReady(true)}
              style={{
                objectFit: "cover",
                transform: "scale(1.55)",
              }}
            />
          </div>

          {!isReady && (
            <img
              loading="lazy"
              src={movieUrl}
              alt="thumbnail"
              className={`${
                isHovered ? "rounded-t-md" : "rounded-md"
              } w-full h-[20svh] object-cover`}
            />
          )}
        </div>

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
          } bg-[#141414] w-full absolute z-50 p-3 shadow-[rgba(0,_0,_0,_0.9)_0px_3px_8px]  rounded-b-md`}
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
