import CardSlider from "@/components/homePage/cardSlider/CardSlider";
import { Introduction } from "@/components/introduction/Introduction";
import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import TopPageMovie from "@/components/homePage/topPageMovie/TopPageMovie";
import Axios from "@/utils/axios";
import { Button, Result } from "antd";

// Import Swiper styles
import "swiper/css";

export default async function Home() {
  // const [newMovieList, setNewMovieList] = useState<[]>([]);
  // const [standaloneMovieList, setStandaloneMovieList] = useState<[]>([]);
  // const [cinemaMovieList, setCinemaMovieList] = useState<[]>([]);
  // const [TVSeriesMovieList, setTVSeriesMovieList] = useState<[]>([]);
  // const [isLoadedApi, setIsLoadedApi] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean>(false);
  // useEffect(() => {
  //   const callApi = async () => {
  //     try {
  //       const res = await Promise.all([
  //         Axios("Movies", {
  //           params: {
  //             sortBy: "produceddate",
  //             page: 1,
  //             eachPage: 15,
  //           },
  //         }),
  //         Axios("Movies", {
  //           params: {
  //             filterBy: "feature",
  //             key: 1,
  //             page: 1,
  //             eachPage: 15,
  //           },
  //         }),
  //         Axios("Movies", {
  //           params: {
  //             filterBy: "feature",
  //             key: 2,
  //             page: 1,
  //             eachPage: 15,
  //           },
  //         }),
  //         Axios("Movies", {
  //           params: {
  //             filterBy: "feature",
  //             key: 3,
  //             page: 1,
  //             eachPage: 15,
  //           },
  //         }),
  //       ]);
  //       setNewMovieList(res[0].data);
  //       setStandaloneMovieList(res[1].data);
  //       setCinemaMovieList(res[2].data);
  //       setTVSeriesMovieList(res[3].data);

  //       setIsLoadedApi(true);
  //     } catch (error) {
  //       console.log(error);
  //       setIsLoadedApi(true);
  //       setIsError(true);
  //     }
  //   };

  //   callApi();
  // }, []);

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
  ]);

  const newMovieList = res[0].data;
  const standaloneMovieList = res[0].data;
  const cinemaMovieList = res[0].data;
  const TVSeriesMovieList = res[0].data;

  return (
    <main>
      {/* {isLoadedApi ? (
        <>
          {isError ? (
            <div className="w-screen h-screen flex justify-center items-center">
              <Result
                status="500"
                title="Sorry, something went wrong"
                extra={
                  <Button type="primary" href="/">
                    Reload
                  </Button>
                }
              />
            </div>
          ) : (
            <>
              <NavigationMovie />
              <TopPageMovie />
              <div className="px-12">
                <CardSlider title="New Movies" movieList={newMovieList} />
                <CardSlider
                  title="Standalone Movies"
                  movieList={standaloneMovieList}
                />
                <CardSlider title="Cinema Movies" movieList={cinemaMovieList} />
                <CardSlider
                  title="TV Series Movies"
                  movieList={TVSeriesMovieList}
                />
              </div>
              <div className="h-[200px] w-full">Footer</div>
            </>
          )}
        </>
      ) : (
        <Introduction />
      )} */}
      {/* <>
        {isError ? (
          <div className="w-screen h-screen flex justify-center items-center">
            <Result
              status="500"
              title="Sorry, something went wrong"
              extra={
                <Button type="primary" href="/">
                  Reload
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <NavigationMovie />
            <TopPageMovie />
            <div className="px-12">
              <CardSlider title="New Movies" movieList={newMovieList} />
              <CardSlider
                title="Standalone Movies"
                movieList={standaloneMovieList}
              />
              <CardSlider title="Cinema Movies" movieList={cinemaMovieList} />
              <CardSlider
                title="TV Series Movies"
                movieList={TVSeriesMovieList}
              />
            </div>
            <div className="h-[200px] w-full">Footer</div>
          </>
        )}
      </> */}
      <>
        <NavigationMovie />
        <TopPageMovie />
        <div className="px-12">
          <CardSlider title="New Movies" movieList={newMovieList} />
          <CardSlider
            title="Standalone Movies"
            movieList={standaloneMovieList}
          />
          <CardSlider title="Cinema Movies" movieList={cinemaMovieList} />
          <CardSlider title="TV Series Movies" movieList={TVSeriesMovieList} />
        </div>
        <div className="h-[200px] w-full">Footer</div>
      </>
    </main>
  );
}
