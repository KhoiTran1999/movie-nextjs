"use client";

import CardSlider from "@/components/cardSlider/CardSlider";
import NavigationMovie from "@/components/navigationMovie/NavigationMovie";
import TopPageMovie from "@/components/topPageMovie/TopPageMovie";
import Axios from "@/utils/axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [movieList1, setMovieList1] = useState<[]>([]);
  const [movieList2, setMovieList2] = useState<[]>([]);
  const [movieList3, setMovieList3] = useState<[]>([]);

  useEffect(() => {
    const callApi = async () => {
      const res1 = await Axios("/users", {
        params: {
          page: 1,
          limit: 5,
        },
      });
      setMovieList1(res1.data);

      const res2 = await Axios("/users", {
        params: {
          page: 2,
          limit: 5,
        },
      });
      setMovieList2(res2.data);

      const res3 = await Axios("/users", {
        params: {
          page: 3,
          limit: 5,
        },
      });
      setMovieList3(res3.data);
    };

    callApi();
  }, []);

  return (
    <main>
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
    </main>
  );
}
