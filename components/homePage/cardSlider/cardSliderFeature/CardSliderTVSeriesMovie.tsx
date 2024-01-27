"use server";

import CardSlider from "../CardSlider";

const CardSliderTVSeriesMovie = async () => {
  const res = await fetch(
    `${process.env.API_URL}/Movies?filterBy=feature&key=3&sortBy=produceddate&page=1&eachPage=10`,
    { cache: "no-store" }
  );
  const TVSeriesMovieList = await res.json();

  return <CardSlider title="TV Series Movies" movieList={TVSeriesMovieList} />;
};

export default CardSliderTVSeriesMovie;