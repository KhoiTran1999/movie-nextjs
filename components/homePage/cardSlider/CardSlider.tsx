"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
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
    <div className="mb-3">
      <>
        <div>
          <div className="group inline-flex w-fit cursor-pointer items-center">
            <h2 className="text-2xl font-bold hover:text-[#D1D0CF] max-[528px]:text-lg">
              {title}
            </h2>
            <div
              className={`invisible ml-3 flex translate-x-[-20px] items-center justify-center font-bold text-[#E50914] opacity-0 transition-all group-hover:visible group-hover:translate-x-[0px] group-hover:opacity-100`}
            >
              <span className="mr-2">See all </span>
              <i className="fa-solid fa-angle-right text-sm"></i>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex">
            <div className="mr-3 h-[140px] w-[120px] animate-pulse rounded-md bg-[#ffffff3f] md:h-[200px] md:w-[150px]"></div>
            <div className="mr-3 h-[140px] w-[120px] animate-pulse rounded-md bg-[#ffffff3f] md:h-[200px] md:w-[150px]"></div>
            <div className="h-[140px] w-[120px] animate-pulse rounded-md bg-[#ffffff3f] md:h-[200px] md:w-[150px]"></div>
          </div>
        ) : (
          <div onMouseEnter={handleOnMouseEnter} onMouseLeave={onMouseLeave}>
            <Swiper
              lazyPreloadPrevNext={5}
              slidesPerView={3}
              breakpoints={{
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
              navigation={isHover && screen.width > 930}
              modules={[Navigation, Scrollbar, A11y, Pagination]}
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
