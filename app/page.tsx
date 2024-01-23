import CardSlider from "@/components/homePage/cardSlider/CardSlider";
import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import TopPageMovie from "@/components/homePage/topPageMovie/TopPageMovie";
import Axios from "@/utils/axios";

export default async function Home() {
  const res = await Promise.all([
    Axios("Movies", {
      params: {
        sortBy: "produceddate",
        page: 1,
        eachPage: 15,
      },
    }),
    Axios("Movies", {
      params: {
        filterBy: "feature",
        key: 1,
        page: 1,
        eachPage: 15,
      },
    }),
    Axios("Movies", {
      params: {
        filterBy: "feature",
        key: 2,
        page: 1,
        eachPage: 15,
      },
    }),
    Axios("Movies", {
      params: {
        filterBy: "feature",
        key: 3,
        page: 1,
        eachPage: 15,
      },
    }),
  ]).catch((error) => {
    console.log(error);
    throw new Error("Failed to fetch Movie List");
  });

  const newMovieList = res[0].data;
  const standaloneMovieList = res[1].data;
  const cinemaMovieList = res[2].data;
  const TVSeriesMovieList = res[3].data;

  return (
    <main>
      <NavigationMovie />
      <TopPageMovie />
      <div className="px-12">
        <CardSlider title="New Movies" movieList={newMovieList} />
        <CardSlider title="Standalone Movies" movieList={standaloneMovieList} />
        <CardSlider title="Cinema Movies" movieList={cinemaMovieList} />
        <CardSlider title="TV Series Movies" movieList={TVSeriesMovieList} />
      </div>
    </main>
  );
}
