"use server";

import CardSlider from "../CardSlider";

import { Popcorn } from "@/public/popcorn";

const CardSliderCinemaMovie = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=feature&key=1&sortBy=produceddate&page=1&eachPage=10`,
    { next: { revalidate: 259200 } },
  );
  const cinemaMovieList = await res.json();

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
