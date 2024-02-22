"use server";

import CardSlider from "../CardSlider";

const CardSliderTVSeriesMovie = async () => {
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
    />
  );
};

export default CardSliderTVSeriesMovie;
