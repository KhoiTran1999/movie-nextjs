"use server";

import CardMovie from "./CardMovieServer";
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

const CardSlider = async ({
  title,
  movieList,
  href,
  icon,
}: cardSliderProps) => {
  return (
    <div className="group mb-3">
      <>
        <Link href={href}>
          <div>
            <div className="group flex cursor-pointer items-center justify-between md:justify-start">
              <div className="flex items-center">
                {icon}
                <h2 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text py-3 text-center text-lg font-bold text-transparent sm:text-2xl">
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

        <div className="mx-[-12px] sm:mx-[-48px]">
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
            <CarouselPrevious className="hidden group-hover:lg:flex" />
            <CarouselNext className="hidden group-hover:lg:flex" />
          </Carousel>
        </div>
      </>
    </div>
  );
};

export default CardSlider;
