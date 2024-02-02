"use client";

import { MovieType } from "@/types";
import { List } from "antd";
import CardMovie from "../homePage/cardSlider/CardMovie";
import { useState } from "react";

interface FeatureMovieList {
  initialRecommendedMovie: MovieType[];
  totalItems: number;
}

const FeatureMovieList = (props: FeatureMovieList) => {
  const { initialRecommendedMovie, totalItems } = props;

  const [recommendedMovie, setRecommendedMovie] = useState<MovieType[]>(
    initialRecommendedMovie,
  );
  const [isSkeleton, setIsSkeleton] = useState<boolean>(false);

  return (
    <div className="mt-6">
      <List
        dataSource={recommendedMovie}
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
          <div onClick={() => setIsSkeleton(true)}>
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

export default FeatureMovieList;
