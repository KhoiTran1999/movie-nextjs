"use client";

import { MovieType } from "@/types";
import Axios from "@/utils/axios";
import { AutoComplete, Input, List } from "antd";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import CardMovie from "../homePage/cardSlider/CardMovie";
import { useInView } from "react-intersection-observer";

const SearchMovie = () => {
  const [ref, inView] = useInView();

  const [movieSearch, setMovieSearch] = useState<MovieType[]>([]);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalElement, setTotalElement] = useState<number>(0);

  //   useEffect(() => {
  //     if (inView) {
  //       const loadMorePage = async () => {
  //         const next = page + 1;
  //         const movieList = await Axios("/Movies", {
  //           params: { key: valueSearch, page: next },
  //         });
  //         setMovieSearch(movieList.data);
  //       };
  //       loadMorePage();
  //     }
  //   }, [inView]);

  const handleSearch = async (text: string) => {
    if (!text) return setMovieSearch([]);
    const res = await fetch(
      `${process.env.API_URL}Movies?key=${encodeURIComponent(text)}&page=${1}&eachPage=3`,
    );
    const movieList = await res.json();
    setMovieSearch(movieList);
    // setValueSearch(text);
    // setTotalElement(movieList.headers);
    console.log(movieList);

    // const totalItems = Number(res.headers.get("x-total-element"));
    console.log(res.headers);
  };

  return (
    <div className="m-auto mt-20 w-full max-w-[1200px] ">
      <div className="flex justify-center">
        <AutoComplete
          style={{ width: 200 }}
          placeholder="What is your favorite movie?"
          onSearch={debounce(handleSearch, 1000)}
        />
      </div>
      <List
        dataSource={movieSearch}
        grid={{
          xs: 3,
          sm: 3,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 5,
          gutter: 12,
        }}
        renderItem={(val: MovieType, idx: number) => (
          <div>
            <CardMovie
              englishName={val.englishName}
              vietnamName={val.vietnamName}
              movieId={val.movieId}
              thumbnail={val.thumbnail}
              time={val.time}
              totalEpisodes={val.totalEpisodes}
              totalSeasons={val.totalSeasons}
            />
          </div>
        )}
      />
    </div>
  );
};

export default SearchMovie;
