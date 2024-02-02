import FeatureMovieList from "@/components/featurePage/FeatureMovieList";
import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import { SuspenseComp } from "@/components/wrapper/SuspenseComp";
import { MovieType } from "@/types";

export default async function Feature(props: any) {
  const featureId = props?.searchParams?.featureId;
  const current = props?.searchParams?.current;

  let movieList: MovieType[];
  let totalItems: number = 0;

  if (!featureId && current === "NewMovie") {
    try {
      const res = await fetch(
        `${process.env.API_URL}/Movies?sortBy=produceddate&page=1&eachPage=10`,
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
  } else {
    try {
      const res = await fetch(
        `${process.env.API_URL}/Movies?filterBy=feature&key=${featureId}&status=All&sortBy=produceddate&page=1&eachPage=10`,
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
      <SuspenseComp>
        <NavigationMovie />
        <FeatureMovieList
          initialRecommendedMovie={movieList}
          totalItems={totalItems}
        />
      </SuspenseComp>
    </div>
  );
}
