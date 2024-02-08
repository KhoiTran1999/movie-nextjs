"use client";

import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import dynamic from "next/dynamic";
import { Rubik_Dirt } from "@next/font/google";
import { StarFilled, FireFilled, InfoCircleOutlined } from "@ant-design/icons";
import { Tabs, Tooltip, Modal, message, Button, Result, List } from "antd";
import { Actor } from "@/components/detailPage/actorList/Actor";
import { useEffect, useRef, useState } from "react";
import { EpisodeModal } from "@/components/detailPage/episodeModal/EpisodeModal";
import { WatchModal } from "@/components/detailPage/watchModal/WatchModal";
import { useDispatch } from "react-redux";
import { setMovieId } from "@/utils/redux/slices/data/movieIdSlice";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MovieDetailType, MovieType, SeasonMovieDetail } from "@/types";
import CardMovie from "../homePage/cardSlider/CardMovie";
import { getRecommendedMovieListAction } from "../actions";
import { useInView } from "react-intersection-observer";

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

interface MainDetailPage {
  movieDetail: MovieDetailType;
  initialRecommendedMovie: MovieType[];
  totalItems: number;
}

export default function MainDetailPage(props: MainDetailPage) {
  const { movieDetail, initialRecommendedMovie, totalItems } = props;

  const [ref, inView] = useInView();

  const dispatch = useDispatch();

  const [recommendedMovie, setRecommendedMovie] = useState<MovieType[]>(
    initialRecommendedMovie,
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isSkeleton, setIsSkeleton] = useState<boolean>(false);
  const [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState<boolean>(false);
  const [isWatchModalOpen, setIsWatchModalOpen] = useState<boolean>(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState<boolean>(false);
  const [watchMovie, setWatchMovie] = useState<SeasonMovieDetail>({
    seasonId: "",
    seasonNumber: 1,
    name: "",
    episodes: [
      {
        episodeId: "",
        episodeNumber: 1,
        name: "",
        video: "",
        dateCreated: "",
        dateUpdated: "",
      },
    ],
  });

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  useEffect(() => {
    setRecommendedMovie(initialRecommendedMovie);
    setPageNumber(0);
    setIsSkeleton(false);
  }, [initialRecommendedMovie]);

  const loadMoreMovies = async () => {
    const next = pageNumber + 1;
    const data = await getRecommendedMovieListAction(movieDetail.movieId, next);
    if (data.length) {
      setPageNumber(next);
      return setRecommendedMovie((prev: MovieType[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...data,
      ]);
    }
  };

  const showModal = async () => {
    setLoadingMovie(true);

    if (movieDetail.totalEpisodes > 1 && movieDetail.totalSeasons >= 1) {
      setLoadingMovie(false);
      return setIsEpisodeModalOpen(true);
    }

    try {
      const res = await fetch(
        `${process.env.API_URL}/Seasons?movieId=${movieDetail.movieId}&seasonNumber=1`,
      );
      const data = await res.json();
      if (!data || data.length === 0) {
        setLoadingMovie(false);
        message.error("Movie is not ready!");
        return;
      }
      setWatchMovie({ ...data[0] });
      setLoadingMovie(false);
    } catch (error) {
      console.log(error);
      setLoadingMovie(false);
    }
    setIsWatchModalOpen(true);
    setLoadingMovie(false);
  };

  const handleCancel = () => {
    setIsEpisodeModalOpen(false);
    dispatch(setMovieId(""));
  };

  const handleCancelWatch = () => {
    setIsWatchModalOpen(false);
    dispatch(setMovieId(""));
  };

  const handleCancelTrailer = () => {
    setIsTrailerModalOpen(false);
  };

  const handleOpenTrailerModal = () => {
    setIsTrailerModalOpen(true);
  };

  return (
    <div>
      <NavigationMovie />
      {isSkeleton ? (
        <div className="m-auto mt-14 w-full max-w-[700px]">
          <div className="my-20 flex items-center justify-center ">
            <div className="flex w-[240px] flex-col justify-center">
              <div className="mb-2 h-8 w-[100%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
              <div className="mb-2 h-4 w-[60%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
              <div className="mb-2 h-4 w-[30%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
              <div className="h-4 w-[40%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
            </div>
            <div className="mx-5 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          </div>
          <div className="mx-5 mb-5 max-w-[700px] border-t border-[#ffffff3f] px-3"></div>
          <div className="m-auto mt-14 w-full max-w-[700px] px-3">
            <div className="flex items-center justify-center">
              <div className="mr-3 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
              <div className="mr-3 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
              <div className="h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="absolute h-screen w-screen brightness-[0.3]"
            style={{
              backgroundImage: `url("/errorThumbnail.jpg")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
            }}
          ></div>
          <div
            className="absolute h-screen w-screen brightness-[0.3]"
            style={{
              background: `url("${movieDetail.thumbnail}"`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
            }}
          ></div>

          <div className="backdrop-blur-sm">
            <div className={`m-auto w-full max-w-[1200px] px-3 py-8`}>
              <div className="m-auto mt-14 w-full max-w-[700px] text-[#D1D0CF]">
                <div className="flex items-center justify-start">
                  <div className="w-fit">
                    <h1
                      className={`${rubik.className} my-2 w-full text-2xl tracking-wider [word-spacing:5px] md:my-4 md:text-4xl`}
                    >
                      {movieDetail.englishName}
                    </h1>
                    <h2 className="font-bold">{movieDetail.vietnamName}</h2>
                    <div className="my-4">
                      <span>{movieDetail.producedDate.slice(0, 4)}</span>
                      <span className="mx-4">
                        {movieDetail.totalSeasons > 1
                          ? `${movieDetail.totalSeasons} seasons`
                          : movieDetail.totalEpisodes > 1
                            ? `${movieDetail.totalEpisodes} episodes`
                            : `${movieDetail.time} minutes`}
                      </span>
                      <span>
                        {movieDetail.mark}/10{" "}
                        <StarFilled className="text-yellow-400" />
                      </span>
                      <ul className="mt-2 flex flex-wrap items-center">
                        {movieDetail.categories.map(
                          (
                            val: { categoryId: number; name: string },
                            idx: number,
                          ) => {
                            if (idx + 1 < movieDetail.categories.length) {
                              return (
                                <li className="mr-2" key={val.categoryId}>
                                  <span className="mr-2 cursor-pointer hover:text-[#E50914]">
                                    {val.name}
                                  </span>
                                  <FireFilled className="text-xs text-[#E50914]" />
                                </li>
                              );
                            }
                            return (
                              <li className="mr-2" key={val.categoryId}>
                                <span className=" cursor-pointer hover:text-[#E50914]">
                                  {val.name}
                                </span>
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="ml-3 w-[30%] overflow-hidden">
                    <LazyLoadImage
                      alt="Thumbnail"
                      src={movieDetail.thumbnail}
                      effect="blur"
                      loading="lazy"
                      className="h-full w-full rounded-md object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/errorThumbnail.jpg";
                      }}
                    />
                  </div>
                </div>

                <Tabs
                  type="card"
                  defaultActiveKey="Description"
                  items={[
                    {
                      key: "Description",
                      label: "Description",
                      children: movieDetail.description,
                    },
                    {
                      key: "Actors",
                      label: "Actors",
                      children: (
                        <Actor
                          castCharacteries={movieDetail.castCharacteries}
                        />
                      ),
                    },
                  ]}
                />
                <div className="mt-10 flex items-center justify-start">
                  <button
                    onClick={showModal}
                    className="mr-3 h-10 w-[121px] rounded-md bg-[red] px-1 text-white"
                    disabled={movieDetail.totalSeasons === 0}
                  >
                    {movieDetail.totalSeasons > 0 ? (
                      <>
                        {loadingMovie ? (
                          <i className="fa-duotone fa-spinner-third mr-2 animate-spin text-xl"></i>
                        ) : (
                          <i className="fa-duotone fa-play mr-2 text-xl"></i>
                        )}

                        <span>Play</span>
                      </>
                    ) : (
                      <span>Upcoming...</span>
                    )}
                  </button>

                  <button
                    onClick={handleOpenTrailerModal}
                    className="mr-3 h-10 w-[121px] rounded-md bg-[#b2afaf2e] px-1 text-white transition-colors hover:bg-[#adaaaa64]"
                  >
                    <InfoCircleOutlined />
                    <span className="ml-3">Trailer</span>
                  </button>

                  <Tooltip color="#b2afaf2e" title="Add watch list">
                    <span
                      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full  bg-[#b2afaf2e] p-3 transition-colors hover:bg-[#adaaaa64]`}
                    >
                      <i className="fa-regular fa-plus text-xl"></i>
                    </span>
                  </Tooltip>

                  <Tooltip color="#b2afaf2e" title="Like">
                    <span
                      className={`mx-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full  bg-[#b2afaf2e] p-3 transition-colors hover:bg-[#adaaaa64]`}
                    >
                      <i className="fa-regular fa-heart text-xl"></i>
                    </span>
                  </Tooltip>

                  <Tooltip color="#b2afaf2e" title="Share">
                    <span
                      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full  bg-[#b2afaf2e] p-3 transition-colors hover:bg-[#adaaaa64]`}
                    >
                      <i className="fa-light fa-share-from-square text-xl"></i>
                    </span>
                  </Tooltip>
                </div>
              </div>
              <div className="mt-8">
                {recommendedMovie?.length ? (
                  <>
                    <h3 className="text-2xl font-bold text-red-700">
                      Recommended Movie
                    </h3>
                    <List
                      dataSource={recommendedMovie}
                      grid={{
                        xs: 3,
                        sm: 3,
                        md: 3,
                        lg: 4,
                        xl: 5,
                        xxl: 5,
                        gutter: 12,
                      }}
                      renderItem={(val: MovieType, idx: number) => (
                        <div onClick={() => setIsSkeleton(true)}>
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
                      )}
                    />
                  </>
                ) : (
                  <></>
                )}
                {totalItems > recommendedMovie.length &&
                totalItems > initialRecommendedMovie.length ? (
                  <div className="mt-6 flex justify-center">
                    <i
                      ref={ref}
                      className="fa-duotone fa-spinner-third animate-spin text-5xl text-[red]"
                    ></i>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <Modal
            centered
            open={isEpisodeModalOpen}
            onCancel={handleCancel}
            footer={null}
            styles={{ body: { paddingTop: "20px", paddingBottom: "10px" } }}
          >
            <EpisodeModal
              movieId={movieDetail.movieId}
              totalSeasons={movieDetail.totalSeasons}
              englishName={movieDetail.englishName}
            />
          </Modal>
          <Modal
            open={isWatchModalOpen}
            centered
            width={"70svw"}
            onCancel={handleCancelWatch}
            footer={null}
            styles={{ body: { paddingTop: "20px", paddingBottom: "10px" } }}
            title={movieDetail.englishName}
            destroyOnClose={!isWatchModalOpen}
          >
            <WatchModal
              episodeNumber={watchMovie?.episodes[0]?.episodeNumber}
              seasonNumber={watchMovie?.seasonNumber}
              name={watchMovie?.episodes[0]?.name}
              video={watchMovie?.episodes[0]?.video}
            />
          </Modal>
          <Modal
            open={isTrailerModalOpen}
            centered
            width={"70svw"}
            footer={null}
            styles={{ body: { paddingTop: "20px", paddingBottom: "10px" } }}
            onCancel={handleCancelTrailer}
            destroyOnClose={!isTrailerModalOpen}
          >
            <div className="h-[30svh] sm:h-[70svh]">
              <ReactPlayer
                url={movieDetail.trailer}
                playing
                controls
                loop
                width={"100%"}
                height={"100%"}
                style={{ backgroundColor: "black" }}
                id="iframeTrailerVideo"
              />
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
