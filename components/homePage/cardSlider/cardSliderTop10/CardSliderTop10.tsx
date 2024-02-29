"use client";

import React, { useEffect, useRef, useState } from "react";
import CardMovieTop10 from "./CardMovieTop10";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    setScreenWidth(screen.width);
  }, []);

  const handleOnMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

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

        <div
          className="mx-[-12px] sm:mx-[-48px]"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              slidesToScroll: 2,
            }}
            orientation="horizontal"
            className="w-full"
          >
            <CarouselContent>
              {movieList.map((val: movieProps, idx: number) => (
                <CarouselItem
                  key={idx}
                  className="basis-[70%] sm:basis-[40%] min-[850px]:basis-[28%] min-[1210px]:basis-[22%] min-[1390px]:basis-[15%]"
                >
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
                </CarouselItem>
              ))}
            </CarouselContent>
            {isHover && screenWidth >= 640 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>
      </>
    </div>
  );
};

export default CardSliderTop10;
