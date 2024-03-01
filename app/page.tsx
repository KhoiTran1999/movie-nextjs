import TopPageMovie from "@/components/homePage/topPageMovie/TopPageMovie";
import { CategoryType } from "@/types";
import { unstable_noStore as noStore } from "next/cache";
import { CardSlider } from "./CardSlider";

interface previewMovieProps {
  description: string;
  englishName: string;
  movieId: number;
  vietnamName: string;
  trailer: string;
  thumbnail: string;
  tag: string;
  categories: CategoryType[];
}

export default async function Home() {
  noStore();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Movies/Newest`, {
    next: { revalidate: 900 },
  });

  const previewMovie: previewMovieProps = await res.json();

  return (
    <main>
      <TopPageMovie previewMovie={previewMovie} />
      <div className="absolute top-[40%] h-fit w-full px-3 pb-5 sm:top-[63%] sm:px-12">
        <CardSlider />
      </div>
    </main>
  );
}
