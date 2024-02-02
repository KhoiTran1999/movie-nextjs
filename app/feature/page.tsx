import FeatureMovieList from "@/components/featurePage/FeatureMovieList";
import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import { MovieType } from "@/types";

export default async function Feature(props: any) {
  const current = props?.searchParams?.current;
  const featureId = props?.searchParams?.featureId;

  let movieList: MovieType[] = [];
  let totalItems: number = 0;

  if (current === "NewMovie") {
    try {
      const res = await fetch(
        `${process.env.API_URL}/Movies?sortBy=producedday}`,
        {
          next: { revalidate: 172800 },
        },
      );

      totalItems = Number(res.headers.get("x-total-element"));
      movieList = await res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch New Movie List!");
    }
  } else if (
    current === "CinemaFilm" ||
    current === "StandaloneFilm" ||
    current === "TVSeries"
  ) {
    try {
      const res = await fetch(
        `${process.env.API_URL}/Movies?filterBy=feature&key=${featureId}&status=All&sortBy=producedday&page=1&eachPage=20}`,
        {
          next: { revalidate: 172800 },
        },
      );

      totalItems = Number(res.headers.get("x-total-element"));
      movieList = await res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch Feature Movie List!");
    }
  }

  return (
    <div>
      <NavigationMovie />
      <FeatureMovieList
        initialRecommendedMovie={movieList}
        totalItems={totalItems}
      />
    </div>
  );
}
