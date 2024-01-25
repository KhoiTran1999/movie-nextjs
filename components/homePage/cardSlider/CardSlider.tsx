"use client";

import React, { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Tooltip } from "antd";
import Link from "next/link";

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

  const handleOnMouseEnter = () => {};
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
              <Link href={`/detail?id=${val.movieId}`}>
                <div
                  className={`flex flex-col justify-center items-center relative cursor-pointer overflow-hidden rounded-md`}
                >
                  <div className="scale-100 group-hover/card:scale-105 transition-all">
                    <LazyLoadImage
                      alt="Thumbnail"
                      src={val.thumbnail}
                      effect="blur"
                      loading="lazy"
                      className="h-[330px] rounded-md object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/errorThumbnail.png";
                      }}
                    />
                  </div>

                  <Tooltip
                    title={
                      <span>
                        <b className="tracking-wide">{val.englishName}</b>
                        <br />
                        {val.vietnamName}
                      </span>
                    }
                    color="red"
                    placement="topLeft"
                  >
                    <div className="w-full p-1 z-50">
                      <h3 className="tracking-wide text-left font-bold text-base whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {val.englishName}
                      </h3>
                      <h4 className="text-left text-gray-400 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {val.vietnamName}
                      </h4>
                    </div>
                  </Tooltip>
                </div>
                <div className="inline-block text-xs font-semibold px-2 py-1 bg-[red] rounded absolute top-2 right-2">
                  {val.totalSeasons > 1
                    ? `${val.totalSeasons} Seasons`
                    : val.totalEpisodes > 1
                    ? `${val.totalEpisodes} Episodes`
                    : `${val.time} minutes`}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CardSlider;
