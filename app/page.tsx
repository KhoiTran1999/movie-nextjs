"use client";

import CardSlider from "@/components/cardSlider/CardSlider";
import { Introduction } from "@/components/introduction/Introduction";
import NavigationMovie from "@/components/navigationMovie/NavigationMovie";
import TopPageMovie from "@/components/topPageMovie/TopPageMovie";
import { Axios2 } from "@/utils/axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [movieList1, setMovieList1] = useState<[]>([]);
  const [movieList2, setMovieList2] = useState<[]>([]);
  const [movieList3, setMovieList3] = useState<[]>([]);
  const [isLoadedApi, setIsLoadedApi] = useState<boolean>(false);

  useEffect(() => {
    const callApi = async () => {
      Promise.all([
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
      ]).then((val) => {
        setMovieList1(val[0].data);
        setMovieList2(val[1].data);
        setMovieList3(val[2].data);
        setIsLoadedApi(true);
      });
    };

    callApi();
  }, []);

  return (
    <main>
      {isLoadedApi ? (
        <>
          <NavigationMovie />
          <TopPageMovie />
          <div className="px-12">
            <CardSlider
              movieList1={movieList1}
              movieList2={movieList2}
              movieList3={movieList3}
            />
            <CardSlider
              movieList1={movieList1}
              movieList2={movieList2}
              movieList3={movieList3}
            />
            <CardSlider
              movieList1={movieList1}
              movieList2={movieList2}
              movieList3={movieList3}
            />
            <CardSlider
              movieList1={movieList1}
              movieList2={movieList2}
              movieList3={movieList3}
            />
          </div>
          <div className="h-[200px] w-full">Footer</div>
        </>
      ) : (
        <Introduction />
      )}
    </main>
  );
}
