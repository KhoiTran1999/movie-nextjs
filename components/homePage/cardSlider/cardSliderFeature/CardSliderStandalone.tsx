"use server";

import CardSlider from "../CardSlider";
import { unstable_noStore as noStore } from "next/cache";

const CardSliderStandalone = async () => {
  noStore();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=feature&key=2&sortBy=produceddate&page=1&eachPage=10`,
    { next: { revalidate: 900 } },
  );
  const standaloneMovieList = await res.json();

  return (
    <CardSlider
      href="/feature?current=StandaloneFilm&featureId=2"
      title="Standalone Movies"
      movieList={standaloneMovieList}
      icon={<i className="fa-regular fa-film mr-2 text-[red] sm:text-2xl"></i>}
    />
  );
};

export default CardSliderStandalone;
