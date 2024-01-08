"use client";

import React, { useEffect, useState } from "react";
import CardMovie from "./CardMovie";
import { Carousel, Flex } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

type cardSliderProps = {
  title: string;
  movieList1: [];
  movieList2: [];
  movieList3: [];
};

type movieProps = {
  mark: number;
  thumbnail: string;
  totalSeasons: number;
  totalEpisodes: number;
  dataCreated: string;
  movieId: string;
};

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        fontSize: "30px",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          borderRadius: 1000,
          backgroundColor: "rgba(159, 158, 158, 0.534)",
        }}
        className="hover:scale-125 transition-all"
      >
        <RightOutlined className="text-white w-6 h-6 hover:scale-[1.35] transition-all" />
      </div>
    </div>
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        fontSize: "30px",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          borderRadius: 1000,
          backgroundColor: "rgba(159, 158, 158, 0.534)",
        }}
        className="hover:scale-125 transition-all"
      >
        <LeftOutlined className="text-white w-6 h-6 hover:scale-[1.35] transition-all" />
      </div>
    </div>
  );
};

const settings = {
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const CardSlider = ({
  title,
  movieList1,
  movieList2,
  movieList3,
}: cardSliderProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [seeAll, setSeeAll] = useState<boolean>(false);

  const handleOnMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div className="mb-10">
      <div className="mb-2">
        <div
          onMouseEnter={() => setSeeAll(true)}
          onMouseLeave={() => setSeeAll(false)}
          className="cursor-pointer inline-flex items-center"
        >
          <h2 className="text-xl hover:text-[#D1D0CF]">{title}</h2>
          <div
            className={`${
              seeAll
                ? "visible opacity-100 translate-x-[0px]"
                : "invisible opacity-0 translate-x-[-20px]"
            } transition-all ml-3 text-xs text-[#E50914] font-bold flex justify-center items-center`}
          >
            <span className="mr-1">See all </span>
            <RightOutlined />
          </div>
        </div>
      </div>
      <div onMouseEnter={handleOnMouseEnter} onMouseLeave={onMouseLeave}>
        <Carousel arrows={isHover} dots={isHover} {...settings}>
          <div>
            <div className="flex items-center">
              {movieList1.map((val: movieProps, idx) => (
                <CardMovie movieUrl={val.thumbnail} key={val.movieId} />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center">
              {movieList2.map((val: movieProps, idx) => (
                <CardMovie movieUrl={val.thumbnail} key={val.movieId} />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center">
              {movieList3.map((val: movieProps, idx) => (
                <CardMovie movieUrl={val.thumbnail} key={val.movieId} />
              ))}
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CardSlider;
