import MainDetailPage from "@/components/detailPage/MainDetailPage";

export default async function Detail(props: any) {
  const movieId = props?.searchParams?.id ?? "";

  let movieDetail;
  try {
    const res = await fetch(`${process.env.API_URL}/Movie/${movieId}`, {
      cache: "no-store",
    });
    movieDetail = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Movie Detail!");
  }

  let recommendedMovie;
  try {
    const res = await fetch(
      `${process.env.API_URL}/Movies?page=1&eachPage=100`,
      {
        cache: "no-store",
      }
    );
    recommendedMovie = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Movie Detail!");
  }

  return (
    <MainDetailPage
      movieDetail={movieDetail}
      recommendedMovie={recommendedMovie}
    />
  );
}
