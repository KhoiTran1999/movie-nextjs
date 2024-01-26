"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "react-lazy-load-image-component/src/effects/blur.css";
import CardMovie from "./CardMovie";

type cardSliderProps = {
  title: string;
  movieList: [];
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

const CardSlider = ({ title, movieList = [] }: cardSliderProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleOnMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div className="mb-10">
      <div className="mb-2">
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
      <div onMouseEnter={handleOnMouseEnter} onMouseLeave={onMouseLeave}>
        <Swiper
          spaceBetween={15}
          lazyPreloadPrevNext={5}
          slidesPerView={5}
          navigation={isHover}
          modules={[Navigation, Scrollbar, A11y]}
          loop
        >
          {movieList.map((val: movieProps, idx: number) => (
            <SwiperSlide key={idx} className="group/card">
              <CardMovie val={val} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CardSlider;
