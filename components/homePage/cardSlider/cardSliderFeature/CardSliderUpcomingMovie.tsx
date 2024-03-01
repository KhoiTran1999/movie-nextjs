"use server";

import CardSlider from "../CardSlider";
import { unstable_noStore as noStore } from "next/cache";
import { Upcoming } from "@/public/upcoming";

const CardSliderUpcomingMovie = async () => {
  noStore();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movies?status=Upcoming&sortBy=produceddate&page=1&eachPage=10`,
    { next: { revalidate: 900 } },
  );
  const UpcomingMovieList = await res.json();

  return (
    <CardSlider
      href="/feature?current=Upcoming"
      title="Upcoming"
      movieList={UpcomingMovieList}
      icon={<Upcoming width={24} height={24} className="mr-2" />}
    />
  );
};

export default CardSliderUpcomingMovie;
