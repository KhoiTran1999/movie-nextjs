"use client";

import { MovieType } from "@/types";
import { AutoComplete, List } from "antd";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import CardMovie from "../homePage/cardSlider/CardMovieClient";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { getSearchMovieListAction } from "../actions";

const SearchMovie = () => {
  const [ref, inView] = useInView();

  const [movieSearch, setMovieSearch] = useState<MovieType[]>([]);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalElement, setTotalElement] = useState<number>(0);
  const [isLoadingSearch, setIsloadingSearch] = useState<boolean>(false);

  useEffect(() => {
    if (inView) {
      const loadMorePage = async () => {
        const next: number = page + 1;
        const movieList = await getSearchMovieListAction(valueSearch, next);
        setMovieSearch((prev: MovieType[] | undefined) => [
          ...(prev?.length ? prev : []),
          ...movieList.data,
        ]);
        setPage(next);
      };
      loadMorePage();
    }
  }, [inView]);

  const handleSearch = async (text: string) => {
    setIsloadingSearch(true);
    if (!text) {
      setPage(1);
      setTotalElement(0);
      setValueSearch("");
      setIsloadingSearch(false);
      return setMovieSearch([]);
    }
    const movieList = await getSearchMovieListAction(text);
    setMovieSearch(movieList.data);
    setValueSearch(text);
    setTotalElement(movieList.totalItems);
    setPage(1);
    setIsloadingSearch(false);
  };

  return (
    <div className="m-auto mt-20 w-full max-w-[1200px] animate-opacityAnimated">
      <div className="flex justify-center">
        <AutoComplete
          style={{ width: 200 }}
          placeholder="What is your favorite movie?"
          onSearch={debounce(handleSearch, 1000)}
          autoFocus
        />
      </div>
      {isLoadingSearch ? (
        <div className="m-auto mt-14 w-full max-w-[700px] px-3">
          <div className="flex items-center justify-center">
            <div className="mr-3 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
            <div className="mr-3 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
            <div className="h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          </div>
        </div>
      ) : (
        <>
          {movieSearch.length === 0 ? (
            <div className="mt-7 flex h-full w-full justify-center">
              <div className="relative aspect-[5/3] w-[400px]">
                {valueSearch ? (
                  <Image
                    src={"/EmptyMovie.png"}
                    alt="EmptyMovie"
                    fill
                    priority
                    className="rounded object-cover"
                    quality={100}
                    sizes="(min-width: 1024px) 100vw, (min-width: 625px) 30vw, 40vw"
                  />
                ) : (
                  <Image
                    src={"/SearchMovie.png"}
                    alt="SearchMovie"
                    fill
                    priority
                    className="rounded object-cover"
                    quality={100}
                    sizes="(min-width: 1024px) 100vw, (min-width: 625px) 30vw, 40vw"
                  />
                )}
              </div>
            </div>
          ) : (
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
                <div className="mt-7">
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
          )}
        </>
      )}

      {totalElement > movieSearch.length && movieSearch.length > 0 && (
        <div className="mt-6 flex justify-center py-3">
          <i
            ref={ref}
            className="fa-duotone fa-spinner-third animate-spin text-5xl text-[red]"
          ></i>
        </div>
      )}
    </div>
  );
};

export default SearchMovie;
