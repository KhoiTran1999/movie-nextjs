"use client";

import React, { useEffect, useRef, useState } from "react";
import CardMovie from "./CardMovie";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RightOutlined } from "@ant-design/icons";

type cardSliderProps = {
  title: string;
  movieList: movieProps[];
  href: string;
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

const CardSlider = ({ title, movieList, href, icon }: cardSliderProps) => {
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
        <Link href={href}>
          <div>
            <div className="group flex cursor-pointer items-center justify-between md:justify-start">
              <div className="flex items-center">
                {icon}
                <h2 className="text-2xl font-bold hover:text-[#D1D0CF] max-[528px]:text-lg">
                  {title}
                </h2>
              </div>
              <div
                className={`visible ml-3 flex translate-x-0 items-center justify-center font-bold text-[red] opacity-100 transition-all group-hover:translate-x-[0px] group-hover:opacity-100 md:invisible md:translate-x-[-20px] md:opacity-0 md:group-hover:visible`}
              >
                <span className="mr-2">See all</span>
                <RightOutlined className="text-sm font-medium" />
              </div>
            </div>
          </div>
        </Link>

        <div
          className="mx-[-12px] sm:mx-[-48px]"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 3,
              dragFree: true,
            }}
            orientation="horizontal"
            className="w-full"
          >
            <CarouselContent>
              {movieList.map((val: movieProps, idx: number) => (
                <CarouselItem
                  key={idx}
                  className="basis-[43%] sm:basis-[30%] min-[850px]:basis-[22%] min-[1210px]:basis-[18%] min-[1390px]:basis-[15%]"
                >
                  <CardMovie
                    englishName={val.englishName}
                    vietnamName={val.vietnamName}
                    movieId={val.movieId}
                    thumbnail={val.thumbnail}
                    time={val.time}
                    totalEpisodes={val.totalEpisodes}
                    totalSeasons={val.totalSeasons}
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

export default CardSlider;
