import CardSliderCinemaMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderCinemaMovie";
import CardSliderNewMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderNewMovie";
import CardSliderStandalone from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderStandalone";
import CardSliderTVSeriesMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderTVSeriesMovie";
import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import TopPageMovie from "@/components/homePage/topPageMovie/TopPageMovie";
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
  const res = await fetch(`${process.env.API_URL}/Movies/Newest`, {
    next: { revalidate: 3600 },
  });

  const previewMovie: previewMovieProps = await res.json();

  return (
    <main>
      <NavigationMovie />
      <TopPageMovie previewMovie={previewMovie} />
      <div className="absolute top-[40%] h-fit w-full px-3 pb-5 sm:top-[63%] sm:px-12">
        <CardSliderNewMovie />
        <CardSliderStandalone />
        <CardSliderCinemaMovie />
        <CardSliderTVSeriesMovie />
      </div>
    </main>
  );
}
