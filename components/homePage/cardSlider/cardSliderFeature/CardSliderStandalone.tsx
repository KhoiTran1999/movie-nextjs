"use server";

import CardSlider from "../CardSlider";

const CardSliderStandalone = async () => {
  const res = await fetch(
    `${process.env.API_URL}/Movies?filterBy=feature&key=1&sortBy=produceddate&page=1&eachPage=10`,
    { next: { revalidate: 172800 } },
  );
  const standaloneMovieList = await res.json();

  return (
    <CardSlider title="Standalone Movies" movieList={standaloneMovieList} />
  );
};

export default CardSliderStandalone;
