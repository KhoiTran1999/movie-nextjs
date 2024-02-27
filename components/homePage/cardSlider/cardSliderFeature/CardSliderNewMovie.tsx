"use server";

import CardSlider from "../CardSlider";
import { unstable_noStore as noStore } from "next/cache";

const CardSliderNewMovie = async () => {
  noStore();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movies?sortBy=produceddate&page=1&eachPage=10`,
    { next: { revalidate: 900 } },
  );
  const newMovieList = await res.json();

  return (
    <CardSlider
      href="/feature?current=NewMovie"
      title="New Movies"
      movieList={newMovieList}
      icon={
        <i className="fa-solid fa-sparkles mr-2 text-[red] sm:text-2xl"></i>
      }
    />
  );
};

export default CardSliderNewMovie;
