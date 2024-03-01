import MainDetailPage from "@/components/detailPage/MainDetailPage";
import { MovieDetailType, MovieType } from "@/types";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  props: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const movieId = props?.searchParams?.id ?? "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movie/${movieId}`,
  );
  const movieDetail: MovieDetailType = await res.json();

  return {
    title: `${movieDetail.englishName} ${movieDetail.producedDate.slice(0, 4)} - ${movieDetail.categories.map((val) => `${val.name} `)}`,
    description: movieDetail.description,
    openGraph: {
      images: [movieDetail.thumbnail],
      title: `${movieDetail.englishName} ${movieDetail.producedDate.slice(0, 4)} - ${movieDetail.categories.map((val) => `${val.name} `)}`,
      description: movieDetail.description,
      type: "website",
    },
  };
}

export default async function Detail(props: any) {
  const movieId = props?.searchParams?.id ?? "";

  let movieDetail: MovieDetailType;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Movie/${movieId}`,
      {
        next: { revalidate: 900 },
      },
    );
    movieDetail = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Movie Detail!");
  }

  return <MainDetailPage movieDetail={movieDetail} />;
}
