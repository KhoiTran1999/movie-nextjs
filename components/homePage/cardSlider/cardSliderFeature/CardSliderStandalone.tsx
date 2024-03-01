"use server";

import CardSlider from "../CardSlider";
import { unstable_noStore as noStore } from "next/cache";
import { Movie } from "@/public/movie";

const CardSliderStandalone = async () => {
  noStore();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=feature&key=2&sortBy=produceddate&page=1&eachPage=10`,
    { cache: "no-cache" },
  );
  const standaloneMovieList = await res.json();

  setTimeout(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Movies?sortBy=produceddate&page=1&eachPage=10`,
      { cache: "no-cache" },
    );
  }, 10000);

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
