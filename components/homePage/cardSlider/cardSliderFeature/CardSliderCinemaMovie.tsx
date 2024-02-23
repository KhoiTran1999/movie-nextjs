"use server";

import CardSlider from "../CardSlider";

const CardSliderCinemaMovie = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=feature&key=1&sortBy=produceddate&page=1&eachPage=10`,
    { next: { revalidate: 900 } },
  );
  const cinemaMovieList = await res.json();

  return (
    <CardSlider
      href="/feature?current=CinemaFilm&featureId=1"
      title="Cinema Movies"
      movieList={cinemaMovieList}
      icon={<i className="fa-solid fa-popcorn mr-2 text-[red] sm:text-2xl"></i>}
    />
  );
};

export default CardSliderCinemaMovie;
