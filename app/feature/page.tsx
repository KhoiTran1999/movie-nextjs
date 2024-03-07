import FeatureMovieList from "@/components/featurePage/FeatureMovieList";
import { MovieType } from "@/types";

export default async function Feature(props: any) {
  const featureId = props?.searchParams?.featureId;
  const current = props?.searchParams?.current;

  let movieList: MovieType[];
  let totalItems: number = 0;

  if (current === "NewMovie") {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Movies?sortBy=produceddate&page=1&eachPage=10`,
        {
          next: { revalidate: 900 },
        },
      );

      totalItems = Number(res.headers.get("x-total-element"));
      movieList = await res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch New Movie List!");
    }
  } else if (current === "Upcoming") {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Movies?status=Upcoming&sortBy=produceddate&page=1&eachPage=10`,
        {
          next: { revalidate: 900 },
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
        `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=feature&key=${featureId}&status=All&sortBy=produceddate&page=1&eachPage=10`,
        {
          next: { revalidate: 900 },
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
      <FeatureMovieList
        initialRecommendedMovie={movieList}
        totalItems={totalItems}
        current={current}
        featureId={featureId}
      />
    </div>
  );
}
