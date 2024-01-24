import { revalidateTagMovieListAction } from "@/components/actions";
import CardSlider from "@/components/homePage/cardSlider/CardSlider";
import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import TopPageMovie from "@/components/homePage/topPageMovie/TopPageMovie";

export default async function Home() {
  const res = await Promise.all([
    fetch(
      `${process.env.API_URL}/Movies?sortBy=produceddate&page=1&eachPage=10`,
      { next: { tags: ["slider-movie"] } }
    ),
    fetch(
      `${process.env.API_URL}/Movies?filterBy=feature&key=1&sortBy=produceddate&page=1&eachPage=10`,
      { next: { tags: ["slider-movie"] } }
    ),
    fetch(
      `${process.env.API_URL}/Movies?filterBy=feature&key=2&sortBy=produceddate&page=1&eachPage=10`,
      { next: { tags: ["slider-movie"] } }
    ),
    fetch(
      `${process.env.API_URL}/Movies?filterBy=feature&key=3&sortBy=produceddate&page=1&eachPage=10`,
      { next: { tags: ["slider-movie"] } }
    ),
  ]).catch((error) => {
    console.log(error);
    throw new Error("Failed to fetch Movie List");
  });

  const newMovieList = await res[0].json();
  const standaloneMovieList = await res[1].json();
  const cinemaMovieList = await res[2].json();
  const TVSeriesMovieList = await res[3].json();

  return (
    <main>
      <NavigationMovie />
      <TopPageMovie />
      <div className="px-12 w-full h-full absolute top-[70%]">
        <CardSlider title="New Movies" movieList={newMovieList} />
        <CardSlider title="Standalone Movies" movieList={standaloneMovieList} />
        <CardSlider title="Cinema Movies" movieList={cinemaMovieList} />
        <CardSlider title="TV Series Movies" movieList={TVSeriesMovieList} />
      </div>
    </main>
  );
}
