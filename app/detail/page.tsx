import MainDetailPage from "@/components/detailPage/MainDetailPage";

export default async function Detail(props: any) {
  const movieId = props?.searchParams?.id ?? "";

  let movieDetail;
  try {
    const res = await fetch(`${process.env.API_URL}/Movie/${movieId}`, {
      next: { revalidate: 3600 },
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
        next: { revalidate: 3600 },
      },
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
