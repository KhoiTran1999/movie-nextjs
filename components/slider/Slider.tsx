"use client";

import { Carousel } from "antd";
import Axios from "@/utils/axios";
import { FireFilled, StarFilled, CaretRightFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Rubik_Dirt } from "@next/font/google";
import Image from "next/image";

interface MovieListProps {
  categories: [{ categoryId: number; name: string }];
  dateCreated: Date;
  description: string;
  englishName: string;
  feature: { featureId: number; name: string };
  mark: number;
  movieId: number;
  nation: { nationId: string; name: string };
  thumbnail: string;
  time: number;
  vietnamName: string;
}

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

const Slider = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios("/Movies", {
          params: {
            eachPage: 4,
          },
        });
        setMovieList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Carousel autoplay className="w-full h-full">
        {movieList.map((val: MovieListProps, idx) => {
          const url = val.thumbnail;
          return (
            <div className="text-white" key={idx + "a"}>
              <img
                src={val.thumbnail}
                alt="thumbnail"
                className="h-screen w-screen bg-contain "
              />
              <div className="text-[#D1D0CF] absolute z-9 top-0 z-0 h-screen w-screen mx-24 flex flex-col justify-center">
                <ul className="flex items-center animate-wiggle">
                  {val.categories.map((value, idx) => {
                    if (idx + 1 < val.categories.length) {
                      return (
                        <li className="mr-3" key={idx}>
                          <span className="mr-3">{value.name}</span>
                          <FireFilled className="text-xs text-[#E50914]" />
                        </li>
                      );
                    }
                    return (
                      <li className="mr-3" key={idx}>
                        <span className="mr-3">{value.name}</span>
                      </li>
                    );
                  })}
                </ul>
                <h1
                  className={`${rubik.className} text-7xl my-4 tracking-wider [word-spacing:5px] animate-wiggle`}
                >
                  {val.englishName}
                </h1>
                <p className="w-2/5 mb-4 animate-wiggle">{val.description}</p>
                <div className="flex justify-start items-center text-sm">
                  <StarFilled className="text-yellow-500" />
                  <span className="mx-3 animate-wiggle">{val.mark}</span>
                  <img className="animate-wiggle" src="/imdb-logo.svg" alt="" />
                  <span className="mx-3 animate-wiggle">
                    {val.time} minutes
                  </span>
                  <span className="text-[#E50914] animate-wiggle">
                    Genres:{" "}
                    <span className="text-[#D1D0CF] hover:text-[#E50914] transition-colors cursor-pointer animate-wiggle">
                      {val.feature.name}
                    </span>
                  </span>
                </div>
                <div className="mt-10">
                  <button className="w-44 px-6 py-3 mr-8 border border-[#E50914] bg-[#E50914] hover:bg-transparent rounded text-sm font-semibold text-white transition-colors">
                    Play Now <CaretRightFilled />
                  </button>
                  <button className="w-44 px-6 py-3 border border-[#E50914] bg-transparent hover:bg-[#E50914] rounded text-sm font-semibold text-white transition-colors">
                    Watch Trailer <CaretRightFilled />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slider;
