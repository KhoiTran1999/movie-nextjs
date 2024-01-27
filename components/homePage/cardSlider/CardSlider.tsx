"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import CardMovie from "./CardMovie";

type cardSliderProps = {
  title: string;
  movieList: movieProps[];
};

type movieProps = {
  movieId: string;
  mark: number;
  time: number;
  vietnamName: string;
  englishName: string;
  thumbnail: string;
  totalSeasons: number;
  totalEpisodes: number;
  dateCreated: string;
};

const CardSlider = ({ title, movieList }: cardSliderProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOnMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    if (movieList) {
      setIsLoading(false);
    }
  }, [movieList]);

  return (
    <div className="mb-10">
      <>
        <div>
          <div className="group cursor-pointer inline-flex items-center w-fit">
            <h2 className="font-bold text-2xl hover:text-[#D1D0CF]">{title}</h2>
            <div
              className={`invisible opacity-0 translate-x-[-20px] group-hover:visible group-hover:opacity-100 group-hover:translate-x-[0px] transition-all ml-3 text-[#E50914] font-bold flex justify-center items-center`}
            >
              <span className="mr-2">See all </span>
              <i className="fa-solid fa-angle-right text-sm"></i>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex">
            <div className="h-[200px] w-[150px] animate-pulse bg-[#ffffff3f] rounded-md mr-3"></div>
            <div className="h-[200px] w-[150px] animate-pulse bg-[#ffffff3f] rounded-md mr-3"></div>
            <div className="h-[200px] w-[150px] animate-pulse bg-[#ffffff3f] rounded-md"></div>
          </div>
        ) : (
          <div onMouseEnter={handleOnMouseEnter} onMouseLeave={onMouseLeave}>
            <Swiper
              lazyPreloadPrevNext={5}
              slidesPerView={1}
              breakpoints={{
                500: {
                  slidesPerView: 2,
                },
                760: {
                  slidesPerView: 3,
                },
                930: {
                  slidesPerView: 4,
                },
                1130: {
                  slidesPerView: 5,
                },
                1400: {
                  slidesPerView: 6,
                },
                1600: {
                  slidesPerView: 7,
                },
                1940: {
                  slidesPerView: 8,
                },
                2150: {
                  slidesPerView: 9,
                },
              }}
              navigation={isHover}
              modules={[Navigation, Scrollbar, A11y]}
              loop
              longSwipes={true}
            >
              {movieList.map((val: movieProps, idx: number) => (
                <SwiperSlide key={idx}>
                  <CardMovie val={val} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </>
    </div>
  );
};

export default CardSlider;
