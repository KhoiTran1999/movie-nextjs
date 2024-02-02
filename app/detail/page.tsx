import MainDetailPage from "@/components/detailPage/MainDetailPage";
import { MovieDetailType, MovieType } from "@/types";

export default async function Detail(props: any) {
  const movieId = props?.searchParams?.id ?? "";

  let movieDetail: MovieDetailType;
  try {
    const res = await fetch(`${process.env.API_URL}/Movie/${movieId}`, {
      next: { tags: ["renew"] },
    });
    movieDetail = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Movie Detail!");
  }

  let initialRecommendedMovie: MovieType[];
  let totalItems;
  try {
    const res = await fetch(
      `${process.env.API_URL}/Movies?filterBy=recommend&key=${movieDetail.movieId}&page=1&eachPage=10`,
      {
        next: { tags: ["renew"] },
      },
    );
    totalItems = Number(res.headers.get("x-total-element"));
    initialRecommendedMovie = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Movie Detail!");
  }

  return (
    <MainDetailPage
      movieDetail={movieDetail}
      initialRecommendedMovie={initialRecommendedMovie}
      totalItems={totalItems}
    />
  );
}
