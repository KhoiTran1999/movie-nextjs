"use client";

import React, { useEffect, useState } from "react";
import CardMovie from "./CardMovie";
import { Carousel, Flex } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

type cardSliderProps = {
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
  movieList1,
  movieList2,
  movieList3,
}: cardSliderProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleOnMouseEnter = () => {
    setIsHover(true);
  };
  const handleOnMouseLeft = () => {
    setIsHover(false);
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl mb-2 hover:text-[#D1D0CF]">Only On Streamit</h2>
      <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeft}>
        <Carousel arrows={isHover} {...settings} className="hidden hello">
          <div>
            <div className="flex items-center">
              {movieList1.map((val: movieProps, idx) => (
                <CardMovie movieUrl={val.thumbnail} key={idx} />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center">
              {movieList2.map((val: movieProps, idx) => (
                <CardMovie movieUrl={val.thumbnail} key={idx} />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center">
              {movieList3.map((val: movieProps, idx) => (
                <CardMovie movieUrl={val.thumbnail} key={idx} />
              ))}
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CardSlider;
