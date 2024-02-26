import CardSliderCinemaMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderCinemaMovie";
import CardSliderNewMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderNewMovie";
import CardSliderStandalone from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderStandalone";
import CardSliderTVSeriesMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderTVSeriesMovie";
import CardSliderTop10Data from "@/components/homePage/cardSlider/cardSliderTop10/CardSliderTop10Data";
import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import TopPageMovie from "@/components/homePage/topPageMovie/TopPageMovie";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { CategoryType } from "@/types";

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Movies/Newest`, {
    next: { revalidate: 900 },
  });

  const previewMovie: previewMovieProps = await res.json();

  return (
    <main>
      <NavigationMovie />
      <TopPageMovie previewMovie={previewMovie} />
      <div className="absolute top-[40%] h-fit w-full px-3 pb-5 sm:top-[63%] sm:px-12">
        <div className="relative z-10">
          <CardSliderNewMovie />
          <CardSliderTop10Data />
          <CardSliderStandalone />
          <CardSliderCinemaMovie />
          <CardSliderTVSeriesMovie />
        </div>
        <BackgroundBeams className="absolute z-0" />
      </div>
    </main>
  );
}
