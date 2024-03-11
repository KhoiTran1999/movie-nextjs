"use server";

import CardSlider from "../CardSlider";

import { Upcoming } from "@/public/upcoming";

const CardSliderUpcomingMovie = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movies?status=Upcoming&sortBy=produceddate&page=1&eachPage=10`,
    { next: { revalidate: 259200 } },
  );
  const UpcomingMovieList = await res.json();

  return (
    <CardSlider
      href="/feature?current=Upcoming&page=1"
      title="Upcoming"
      movieList={UpcomingMovieList}
      icon={<Upcoming width={24} height={24} className="mr-2" />}
    />
  );
};

export default CardSliderUpcomingMovie;
