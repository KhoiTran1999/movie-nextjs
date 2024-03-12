import MainDetailPage from "@/components/detailPage/MainDetailPage";
import CardMovie from "@/components/homePage/cardSlider/CardMovieServer";
import { MovieDetailType, MovieType } from "@/types";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

export async function generateMetadata(
  props: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const movieId = props.params.slug[1];

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
  const movieId = props.params.slug[1];

  let movieDetail: MovieDetailType;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Movie/${movieId}`,
      {
        next: { revalidate: 259200 },
      },
    );
    movieDetail = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Movie Detail!");
  }

  let initialRecommendedMovie: MovieType[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=recommend&key=${movieDetail.movieId}&page=1&eachPage=10`,
      {
        next: { revalidate: 259200 },
      },
    );
    initialRecommendedMovie = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Movie Detail!");
  }

  return (
    <div>
      <div className="absolute h-screen w-screen brightness-[0.3] ">
        <Image
          src={`${movieDetail.thumbnail}`}
          alt="Thumbnail"
          fill
          priority
          className="rounded object-cover"
          quality={50}
          sizes="(min-width: 1024px) 100vw , (min-width: 625px) 30vw, 40vw"
        />
        <div className="absolute bottom-0 h-10 w-full bg-gradient-to-b from-transparent to-black"></div>
      </div>
      <div className="backdrop-blur-sm">
        <MainDetailPage movieDetail={movieDetail} />
        <div className="m-auto mt-8 w-full max-w-[1200px]">
          <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
            {initialRecommendedMovie.map((val: MovieType, idx: number) => (
              <div key={idx}>
                <CardMovie
                  englishName={val.englishName}
                  vietnamName={val.vietnamName}
                  movieId={val.movieId}
                  thumbnail={val.thumbnail}
                  time={val.time}
                  totalEpisodes={val.totalEpisodes}
                  totalSeasons={val.totalSeasons}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
