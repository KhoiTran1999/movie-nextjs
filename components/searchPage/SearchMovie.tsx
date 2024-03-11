"use client";

import { MovieType } from "@/types";
import { AutoComplete, Button } from "antd";
import debounce from "lodash.debounce";
import { useState } from "react";
import CardMovie from "../homePage/cardSlider/CardMovieClient";
import Image from "next/image";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface SearchMovieType {
  movieSearch: MovieType[];
  totalPage: number;
  page: number;
  text: string;
}

const SearchMovie = (props: SearchMovieType) => {
  const { movieSearch, totalPage, page, text } = props;

  const router = useRouter();

  const [valueSearch, setValueSearch] = useState<string>(text || "");

  const handleSearch = async (text: string) => {
    setValueSearch(text);
    router.push(`/search?text=${text}&page=1&eachPage=10`);
  };

  return (
    <div className="m-auto mt-20 w-full animate-opacityAnimated">
      <div className="flex justify-center">
        <AutoComplete
          style={{ width: 200 }}
          placeholder="What is your favorite movie?"
          onSearch={debounce(handleSearch, 1000)}
          autoFocus
          defaultValue={text}
        />
      </div>
      <>
        {movieSearch?.length === 0 ? (
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
          <div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
              {movieSearch?.map((val: MovieType, idx: number) => (
                <div key={idx}>
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
              ))}
            </div>{" "}
            <div className="mr-5 flex items-center justify-end">
              <Button
                disabled={page === 1}
                href={`/search?text=${valueSearch}&page=${page - 1}&eachPage=10`}
                type="text"
              >
                <div>
                  <LeftOutlined />
                </div>
              </Button>
              <span className="mx-5">
                {page} / {totalPage}
              </span>
              <Button
                disabled={page === totalPage}
                href={`/search?text=${valueSearch}&page=${page + 1}&eachPage=10`}
                type="text"
              >
                <div>
                  <RightOutlined />
                </div>
              </Button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SearchMovie;
