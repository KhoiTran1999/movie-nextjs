"use server";

import CardSlider from "../CardSlider";
import { unstable_noStore as noStore } from "next/cache";
import { Tv } from "@/public/tv";

const CardSliderTVSeriesMovie = async () => {
  noStore();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=feature&key=3&sortBy=produceddate&page=1&eachPage=10`,
    { next: { revalidate: 900 } },
  );
  const TVSeriesMovieList = await res.json();

  return (
    <CardSlider
      href="/feature?current=TVSeries&featureId=3"
      title="TV Series Movies"
      movieList={TVSeriesMovieList}
      icon={<Tv width={24} height={24} className="mr-2" />}
    />
  );
};

export default CardSliderTVSeriesMovie;
