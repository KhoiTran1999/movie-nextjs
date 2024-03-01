"use client";

import { List } from "antd";
import React from "react";
import CardMovie from "../homePage/cardSlider/CardMovie";
import { MovieDetailType, MovieType } from "@/types";
import { getRecommendedMovieListAction } from "../actions";

interface RecommendedMovieType {
  movieDetail: MovieDetailType;
}

const RecommendedMovie = async ({ movieDetail }: RecommendedMovieType) => {
  let initialRecommendedMovie: MovieType[] = [];
  try {
    initialRecommendedMovie = await getRecommendedMovieListAction(
      movieDetail.movieId,
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Movie Detail!");
  }
  return (
    <List
      dataSource={initialRecommendedMovie}
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
  );
};

export default RecommendedMovie;
