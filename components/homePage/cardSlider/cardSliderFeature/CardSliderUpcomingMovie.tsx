"use server";

import CardSlider from "../CardSlider";
import { unstable_noStore as noStore } from "next/cache";

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
      icon={
        <i className="fa-regular fa-cart-shopping-fast mr-2 text-[red] sm:text-2xl"></i>
      }
    />
  );
};

export default CardSliderUpcomingMovie;
