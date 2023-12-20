"use client";

import React, { useEffect } from "react";
import CardMovie from "./CardMovie";
import { Carousel } from "antd";

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

const CardSlider = ({
  movieList1,
  movieList2,
  movieList3,
}: cardSliderProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl mb-2 hover:text-[#D1D0CF]">Only On Streamit</h2>
      <Carousel dots={false} className="hidden hello">
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
  );
};

export default CardSlider;
