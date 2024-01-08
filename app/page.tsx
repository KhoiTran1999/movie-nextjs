"use client";

import CardSlider from "@/components/homePage/cardSlider/CardSlider";
import { Introduction } from "@/components/introduction/Introduction";
import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import TopPageMovie from "@/components/homePage/topPageMovie/TopPageMovie";
import { Axios2 } from "@/utils/axios";
import { useEffect, useState } from "react";
import { Button, Result } from "antd";

export default function Home() {
  const [movieList1, setMovieList1] = useState<[]>([]);
  const [movieList2, setMovieList2] = useState<[]>([]);
  const [movieList3, setMovieList3] = useState<[]>([]);
  const [isLoadedApi, setIsLoadedApi] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await Promise.all([
          Axios2("/users", {
            params: {
              page: 1,
              limit: 5,
            },
          }),
          Axios2("/users", {
            params: {
              page: 2,
              limit: 5,
            },
          }),
          Axios2("/users", {
            params: {
              page: 3,
              limit: 5,
            },
          }),
        ]);
        setMovieList1(res[0].data);
        setMovieList2(res[1].data);
        setMovieList3(res[2].data);
        setIsLoadedApi(true);
      } catch (error) {
        console.log(error);
        setIsLoadedApi(true);
        setIsError(true);
      }
    };

    callApi();
  }, []);

  return (
    <main>
      {isLoadedApi ? (
        <>
          {isError ? (
            <Result
              status="500"
              title="Sorry, something went wrong"
              extra={
                <Button type="primary" href="/">
                  Reload
                </Button>
              }
            />
          ) : (
            <>
              <NavigationMovie />
              <TopPageMovie />
              <div className="px-12">
                <CardSlider
                  title="New Movies"
                  movieList1={movieList1}
                  movieList2={movieList2}
                  movieList3={movieList3}
                />
                <CardSlider
                  title="Standalone Film"
                  movieList1={movieList1}
                  movieList2={movieList2}
                  movieList3={movieList3}
                />
                <CardSlider
                  title="Cinema Film"
                  movieList1={movieList1}
                  movieList2={movieList2}
                  movieList3={movieList3}
                />
                <CardSlider
                  title="TV Series"
                  movieList1={movieList1}
                  movieList2={movieList2}
                  movieList3={movieList3}
                />
              </div>
              <div className="h-[200px] w-full">Footer</div>
            </>
          )}
        </>
      ) : (
        <Introduction />
      )}
    </main>
  );
}
