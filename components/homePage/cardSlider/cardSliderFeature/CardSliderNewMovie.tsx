"use server";

import CardSlider from "../CardSlider";

const CardSliderNewMovie = async () => {
  const res = await fetch(
    `${process.env.API_URL}/Movies?sortBy=produceddate&page=1&eachPage=10`,
    { next: { tags: ["renew"] } },
  );
  const newMovieList = await res.json();

  return <CardSlider title="New Movies" movieList={newMovieList} />;
};

export default CardSliderNewMovie;
