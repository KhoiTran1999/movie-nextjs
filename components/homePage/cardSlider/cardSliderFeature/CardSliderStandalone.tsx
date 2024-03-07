"use server";

import CardSlider from "../CardSlider";

import { Movie } from "@/public/movie";

const CardSliderStandalone = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=feature&key=2&sortBy=produceddate&page=1&eachPage=10`,
    { next: { revalidate: 259200 } },
  );
  const standaloneMovieList = await res.json();

  return (
    <CardSlider
      href="/feature?current=StandaloneFilm&featureId=2"
      title="Standalone Movies"
      movieList={standaloneMovieList}
      icon={<Movie width={24} height={24} className="mr-2" fill="red" />}
    />
  );
};

export default CardSliderStandalone;
