"use server";

import CardSlider from "../CardSlider";

const CardSliderCinemaMovie = async () => {
  const res = await fetch(
    `${process.env.API_URL}/Movies?filterBy=feature&key=2&sortBy=produceddate&page=1&eachPage=10`,
    { cache: "no-store" }
  );
  const cinemaMovieList = await res.json();

  return <CardSlider title="Cinema Movies" movieList={cinemaMovieList} />;
};

export default CardSliderCinemaMovie;
