import CardSliderCinemaMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderCinemaMovie";
import CardSliderNewMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderNewMovie";
import CardSliderStandalone from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderStandalone";
import CardSliderTVSeriesMovie from "@/components/homePage/cardSlider/cardSliderFeature/CardSliderTVSeriesMovie";
import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import TopPageMovie from "@/components/homePage/topPageMovie/TopPageMovie";

interface previewMovieProps {
  description: string;
  englishName: string;
  movieId: number;
  vietnamName: string;
  trailer: string;
  thumbnail: string;
}

export default async function Home() {
  const res = await fetch(`${process.env.API_URL}/Movies/Newest`, {
    cache: "no-store",
  });

  const previewMovie: previewMovieProps = await res.json();

  return (
    <main>
      <NavigationMovie />
      <TopPageMovie previewMovie={previewMovie} />
      <div className="px-3 sm:px-12  pb-5 w-full h-fit absolute top-[63%] sm:top-[63%] lg:top-[70%]">
        <CardSliderNewMovie />
        <CardSliderStandalone />
        <CardSliderCinemaMovie />
        <CardSliderTVSeriesMovie />
      </div>
    </main>
  );
}
