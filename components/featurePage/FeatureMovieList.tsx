"use client";

import { MovieType } from "@/types";
import { List, Result } from "antd";
import CardMovie from "../homePage/cardSlider/CardMovie";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoadingFeature } from "@/utils/redux/slices/toggle/IsLoadingFeatureSlice ";
import { isLoadingFeatureSelector } from "@/utils/redux/selector";

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
      const res = await fetch(
        `${process.env.API_URL}/Movies?filterBy=feature&key=${featureId}&status=All&sortBy=produceddate&page=${next}&eachPage=10`,
      );
      data = await res.json();
    } else {
      const res = await fetch(
        `${process.env.API_URL}/Movies?sortBy=produceddate&page=${next}&eachPage=10`,
      );
      data = await res.json();
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
      {isLoadingFeature ? (
        <div className="m-auto mt-14 w-full max-w-[700px] px-3">
          <div className="flex items-center justify-center">
            <div className="mr-3 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
            <div className="mr-3 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
            <div className="h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          </div>
        </div>
      ) : (
        <div className="mt-14 px-4">
          {current === "NewMovie" && (
            <h2 className="font-bold md:hidden">New Movie</h2>
          )}
          {current === "CinemaFilm" && (
            <h2 className="font-bold md:hidden">Cinema Film</h2>
          )}
          {current === "StandaloneFilm" && (
            <h2 className="font-bold md:hidden">Standalone Film</h2>
          )}
          {current === "TVSeries" && (
            <h2 className="font-bold md:hidden">TV Series</h2>
          )}
          {recommendedMovie?.length ? (
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
            <div className="mt-6 flex justify-center">
              <i
                ref={ref}
                className="fa-duotone fa-spinner-third animate-spin text-5xl text-[red]"
              ></i>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default FeatureMovieList;
