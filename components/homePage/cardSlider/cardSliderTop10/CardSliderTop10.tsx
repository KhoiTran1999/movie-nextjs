"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import CardMovieTop10 from "./CardMovieTop10";

type cardSliderProps = {
  title: string;
  movieList: movieProps[];
  icon: React.ReactNode;
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

const CardSliderTop10 = ({ title, movieList, icon }: cardSliderProps) => {
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
          <div className="group flex items-center justify-between md:justify-start">
            <div className="flex items-center">
              {icon}
              <h2 className="text-2xl font-bold max-[528px]:text-lg">
                {title}
              </h2>
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
              slidesPerView={1}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1000: {
                  slidesPerView: 4,
                },
                1400: {
                  slidesPerView: 5,
                },
                1600: {
                  slidesPerView: 6,
                },
                1940: {
                  slidesPerView: 7,
                },
                2150: {
                  slidesPerView: 8,
                },
              }}
              navigation={isHover && screen.width > 930}
              modules={[Navigation, Scrollbar, A11y, Pagination]}
              longSwipes={true}
            >
              {movieList.map((val: movieProps, idx: number) => (
                <SwiperSlide key={idx}>
                  <CardMovieTop10
                    englishName={val.englishName}
                    vietnamName={val.vietnamName}
                    movieId={val.movieId}
                    thumbnail={val.thumbnail}
                    time={val.time}
                    totalEpisodes={val.totalEpisodes}
                    totalSeasons={val.totalSeasons}
                    idx={idx}
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

export default CardSliderTop10;
