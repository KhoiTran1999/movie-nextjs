"use server";

import CardSlider from "../CardSlider";

const CardSliderStandalone = async () => {
  const res = await fetch(
    `${process.env.API_URL}/Movies?filterBy=feature&key=2&sortBy=produceddate&page=1&eachPage=10`,
    { next: { revalidate: 900 } },
  );
  const standaloneMovieList = await res.json();

  return (
    <CardSlider
      href="/feature?current=StandaloneFilm&featureId=2"
      title="Standalone Movies"
      movieList={standaloneMovieList}
    />
  );
};

export default CardSliderStandalone;
