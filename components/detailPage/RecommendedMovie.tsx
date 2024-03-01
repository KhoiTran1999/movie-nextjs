"use client";

import { List } from "antd";
import React, { useEffect, useState } from "react";
import CardMovie from "../homePage/cardSlider/CardMovie";
import { MovieDetailType, MovieType } from "@/types";
import { getRecommendedMovieListAction } from "../actions";

interface RecommendedMovieType {
  movieDetail: MovieDetailType;
}

const RecommendedMovie = async ({ movieDetail }: RecommendedMovieType) => {
  const [recommendedMovie, setRecommendedMovie] = useState<MovieType[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getRecommendedMovieListAction(movieDetail.movieId);
        setRecommendedMovie(data);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch Movie Detail!");
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      {recommendedMovie.length === 0 ? (
        <div className="flex items-center">
          <div className="mr-3 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="mr-3 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
        </div>
      ) : (
        <List
          dataSource={recommendedMovie}
          grid={{
            xs: 3,
            sm: 3,
            md: 4,
            lg: 5,
            xl: 5,
            xxl: 5,
            gutter: 12,
          }}
          renderItem={(val: MovieType, idx: number) => (
            <CardMovie
              englishName={val.englishName}
              vietnamName={val.vietnamName}
              movieId={val.movieId}
              thumbnail={val.thumbnail}
              time={val.time}
              totalEpisodes={val.totalEpisodes}
              totalSeasons={val.totalSeasons}
            />
          )}
        />
      )}
    </>
  );
};

export default React.memo(RecommendedMovie);
