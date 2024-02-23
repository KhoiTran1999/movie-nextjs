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
import { motion, AnimatePresence } from "framer-motion";

interface FeatureMovieList {
  initialRecommendedMovie: MovieType[];
  totalItems: number;
  current: string;
}

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
    <>
      <div className="mt-14 px-4">
        {current === "NewMovie" && (
          <div className="flex items-center">
            <i className="fa-solid fa-sparkles mr-2 text-[red] sm:text-2xl"></i>
            <h2 className="font-bold md:hidden">New Movie</h2>
          </div>
        )}
        {current === "CinemaFilm" && (
          <div className="flex items-center">
            <i className="fa-solid fa-popcorn mr-2 text-[red] sm:text-2xl"></i>
            <h2 className="font-bold md:hidden">Cinema Film</h2>
          </div>
        )}
        {current === "StandaloneFilm" && (
          <div className="flex items-center">
            <i className="fa-regular fa-film mr-2 text-[red] sm:text-2xl"></i>
            <h2 className="font-bold md:hidden">Standalone Film</h2>
          </div>
        )}
        {current === "TVSeries" && (
          <div className="flex items-center">
            <i className="fa-solid fa-camera-movie mr-2 text-[red] sm:text-2xl"></i>
            <h2 className="font-bold md:hidden">TV Series</h2>
          </div>
        )}
        {recommendedMovie?.length ? (
          <AnimatePresence>
            <motion.div
              key={recommendedMovie.length}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                opacity: { ease: "linear" },
                duration: 0.75,
              }}
            >
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
            </motion.div>
          </AnimatePresence>
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
      <Spin spinning={isLoadingFeature} size="large" fullscreen />
    </>
  );
};

export default FeatureMovieList;
