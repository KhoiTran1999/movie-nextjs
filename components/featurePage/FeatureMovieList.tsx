"use client";

import { MovieType } from "@/types";
import { List, Result } from "antd";
import CardMovie from "../homePage/cardSlider/CardMovie";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";

interface FeatureMovieList {
  initialRecommendedMovie: MovieType[];
  totalItems: number;
}

const FeatureMovieList = (props: FeatureMovieList) => {
  const { initialRecommendedMovie, totalItems } = props;

  const searchParams = useSearchParams();

  const featureId = searchParams.get("featureId");

  const [ref, inView] = useInView();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [recommendedMovie, setRecommendedMovie] = useState<MovieType[]>(
    initialRecommendedMovie,
  );

  useEffect(() => {
    setRecommendedMovie(initialRecommendedMovie);
  }, [initialRecommendedMovie]);

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  const loadMoreMovies = async () => {
    const next = pageNumber + 1;
    const res = await fetch(
      `${process.env.API_URL}/Movies?filterBy=feature&key=${featureId}&status=All&sortBy=producedday&page=${next}&eachPage=10`,
      {
        next: { revalidate: 172800 },
      },
    );
    const data = await res.json();
    if (data.length) {
      setPageNumber(next);
      return setRecommendedMovie((prev: MovieType[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...data.data,
      ]);
    }
  };

  return (
    <div className="mt-8">
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
      totalItems > initialRecommendedMovie.length ? (
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
  );
};

export default FeatureMovieList;
