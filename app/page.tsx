import CardSliderCinemaMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderCinemaMovie";
import CardSliderNewMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderNewMovie";
import CardSliderStandalone from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderStandalone";
import CardSliderTVSeriesMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderTVSeriesMovie";
import CardSliderUpcomingMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderUpcomingMovie";
import CardSliderTop10Data from "@/components/homePage/cardSlider/cardSliderTop10/CardSliderTop10Data";
import TopPageMovie from "@/components/homePage/topPageMovie/TopPageMovie";
import PageTransitionEffect from "@/components/ui/pageTransitionEffect";
import { CategoryType } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

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
      <PageTransitionEffect>
        <TopPageMovie previewMovie={previewMovie} />
        <div className="absolute top-[40%] h-fit w-full px-3 pb-5 sm:top-[63%] sm:px-12">
          <CardSliderNewMovie />
          <CardSliderTop10Data />
          <CardSliderUpcomingMovie />
          <CardSliderStandalone />
          <CardSliderCinemaMovie />
          <CardSliderTVSeriesMovie />
        </div>
      </PageTransitionEffect>
    </main>
  );
}
