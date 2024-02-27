"use client";

import { MovieType } from "@/types";
import { List, Result, Spin } from "antd";
import CardMovie from "../homePage/cardSlider/CardMovie";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoadingFeature } from "@/utils/redux/slices/toggle/IsLoadingFeatureSlice ";
import { isLoadingFeatureSelector } from "@/utils/redux/selector";
import {
  getLoadMoreFeatureMovieListAction,
  getLoadMoreNewMovieListAction,
} from "../actions";
import PageTransitionEffect from "../ui/pageTransitionEffect";

interface FeatureMovieList {
  initialRecommendedMovie: MovieType[];
  totalItems: number;
  current: string;
}

interface TileType {
  title: string;
}

export const Tile = ({ title }: TileType) => (
  <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text py-3 text-center text-4xl font-bold text-transparent md:text-7xl">
    {title}
  </h1>
);

const FeatureMovieList = (props: FeatureMovieList) => {
  const { initialRecommendedMovie, totalItems, current } = props;

  const searchParams = useSearchParams();

  const dispatch = useDispatch();

  const isLoadingFeature = useSelector(isLoadingFeatureSelector);

  const featureId = searchParams.get("featureId");

  const [ref, inView] = useInView();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isOutOfRange, setIsOutOfRange] = useState<boolean>(false);
  const [recommendedMovie, setRecommendedMovie] = useState<MovieType[]>(
    initialRecommendedMovie,
  );

  useEffect(() => {
    setRecommendedMovie(initialRecommendedMovie);
    setPageNumber(1);
    setIsOutOfRange(false);
    dispatch(setIsLoadingFeature(false));
  }, [initialRecommendedMovie]);

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  const loadMoreMovies = async () => {
    const next = pageNumber + 1;
    let data: MovieType[];
    if (featureId) {
      data = await getLoadMoreFeatureMovieListAction(featureId, next);
    } else {
      data = await getLoadMoreNewMovieListAction(next);
    }

    if (data.length) {
      setPageNumber(next);
      setIsOutOfRange(false);
      return setRecommendedMovie((prev: MovieType[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...data,
      ]);
    } else {
      setIsOutOfRange(true);
      setPageNumber(1);
    }
  };

  return (
    <PageTransitionEffect>
      <div className="mt-14 px-4">
        <Tile title={current} />

        {recommendedMovie?.length ? (
          <div className="mt-[20px]">
            <List
              dataSource={recommendedMovie}
              grid={{
                xs: 3,
                sm: 3,
                md: 4,
                lg: 5,
                xl: 6,
                xxl: 8,
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
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Result
              status="error"
              title="Something went wrong"
              subTitle="Please wait a few minutes"
            />
          </div>
        )}
        {totalItems > recommendedMovie.length &&
        totalItems > initialRecommendedMovie.length &&
        !isOutOfRange ? (
          <div className="mt-6 flex justify-center py-3">
            <i
              ref={ref}
              className="fa-duotone fa-spinner-third animate-spin text-5xl text-[red]"
            ></i>
          </div>
        ) : (
          <></>
        )}
      </div>
      {isLoadingFeature && (
        <Spin spinning={isLoadingFeature} size="large" fullscreen />
      )}
    </PageTransitionEffect>
  );
};

export default FeatureMovieList;
