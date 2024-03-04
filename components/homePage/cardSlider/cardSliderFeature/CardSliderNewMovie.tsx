"use server";

import CardSlider from "../CardSlider";

import { Stars } from "@/public/stars";

const CardSliderNewMovie = async () => {
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
      icon={<Stars width={24} height={24} className="mr-2" fill="red" />}
    />
  );
};

export default CardSliderNewMovie;
