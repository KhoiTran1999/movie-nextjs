"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import CardMovie from "./CardMovie";
import Link from "next/link";

type cardSliderProps = {
  title: string;
  movieList: movieProps[];
  href: string;
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

const CardSlider = ({ title, movieList, href }: cardSliderProps) => {
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
        <Link href={href}>
          <div>
            <div className="group flex cursor-pointer items-center justify-between md:justify-start">
              <h2 className="text-2xl font-bold hover:text-[#D1D0CF] max-[528px]:text-lg">
                {title}
              </h2>
              <div
                className={`visible ml-3 flex translate-x-0 items-center justify-center font-bold text-[#E50914] opacity-100 transition-all group-hover:translate-x-[0px] group-hover:opacity-100 md:invisible md:translate-x-[-20px] md:opacity-0 md:group-hover:visible`}
              >
                <span className="mr-2">See all </span>
                <i className="fa-solid fa-angle-right text-sm"></i>
              </div>
            </div>
          </div>
        </Link>

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
                  <CardMovie
                    englishName={val.englishName}
                    vietnamName={val.vietnamName}
                    movieId={val.movieId}
                    thumbnail={val.thumbnail}
                    time={val.time}
                    totalEpisodes={val.totalEpisodes}
                    totalSeasons={val.totalSeasons}
                  />
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
