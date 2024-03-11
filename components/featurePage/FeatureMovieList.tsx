"use client";

import { MovieType } from "@/types";
import { List, Result } from "antd";
import CardMovie from "../homePage/cardSlider/CardMovieClient";
import { useRouter } from "next/navigation";

interface FeatureMovieList {
  initialRecommendedMovie: MovieType[];
  totalItems: number;
  current: string;
  featureId: string;
}

interface TileType {
  title: string;
}

export const Tile = ({ title }: TileType) => (
  <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text py-3 text-center text-4xl font-bold text-transparent md:text-7xl">
    {title}
  </h1>
);

const FeatureMovieList = async (props: FeatureMovieList) => {
  const { initialRecommendedMovie, totalItems, current, featureId } = props;
  const router = useRouter();

  return (
    <>
      <div className="mb-5 mt-14 animate-opacityAnimated px-4">
        <Tile title={current} />
        {initialRecommendedMovie?.length ? (
          <div className="mt-[20px]">
            <List
              dataSource={initialRecommendedMovie}
              grid={{
                xs: 3,
                sm: 3,
                md: 4,
                lg: 5,
                xl: 6,
                xxl: 8,
                gutter: 12,
              }}
              pagination={{
                total: totalItems,
                onChange(page, pageSize) {
                  router.push(
                    `/feature?current=${current}&page=${page}&featureId=${featureId}`,
                  );
                },
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
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Result
              status="error"
              title="Something went wrong"
              subTitle="Please wait a few minutes"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FeatureMovieList;
