"use server";

import CardSlider from "../CardSlider";
import { unstable_noStore as noStore } from "next/cache";
import { Popcorn } from "@/public/popcorn";

const CardSliderCinemaMovie = async () => {
  noStore();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=feature&key=1&sortBy=produceddate&page=1&eachPage=10`,
    { cache: "no-cache" },
  );
  const cinemaMovieList = await res.json();

  setTimeout(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Movies?sortBy=produceddate&page=1&eachPage=10`,
      { cache: "no-cache" },
    );
  }, 10000);

  return (
    <CardSlider
      href="/feature?current=CinemaFilm&featureId=1"
      title="Cinema Movies"
      movieList={cinemaMovieList}
      icon={<Popcorn width={24} height={24} className="mr-2" />}
    />
  );
};

export default CardSliderCinemaMovie;
