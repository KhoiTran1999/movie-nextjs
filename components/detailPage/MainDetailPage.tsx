"use client";

import dynamic from "next/dynamic";
import { Rubik_Dirt } from "next/font/google";
import { StarFilled, FireFilled, InfoCircleOutlined } from "@ant-design/icons";
import { Tabs, Tooltip, Modal, message, List, Spin } from "antd";
import { Actor } from "@/components/detailPage/actorList/Actor";
import { useEffect, useState } from "react";
import EpisodeModal from "@/components/detailPage/episodeModal/EpisodeModal";
import WatchModal from "@/components/detailPage/watchModal/WatchModal";
import { useDispatch } from "react-redux";
import { setMovieId } from "@/utils/redux/slices/data/movieIdSlice";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});
import { MovieDetailType, MovieType, SeasonMovieDetail } from "@/types";
import CardMovie from "../homePage/cardSlider/CardMovie";
import Image from "next/image";
import { Typography } from "antd";
import { Play } from "@/public/play";
import { Plus } from "@/public/plus";
import { Heart } from "@/public/heart";
import { Copy } from "@/public/copy";
import { LoadingIcon } from "@/public/loading";
import { getSeasonListAction } from "../actions";

const { Paragraph } = Typography;

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

interface MainDetailPage {
  movieDetail: MovieDetailType;
  initialRecommendedMovie: MovieType[];
}

export default function MainDetailPage(props: MainDetailPage) {
  const { movieDetail, initialRecommendedMovie } = props;

  const dispatch = useDispatch();

  const [recommendedMovie, setRecommendedMovie] = useState<MovieType[]>(
    initialRecommendedMovie,
  );
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
    setRecommendedMovie(initialRecommendedMovie);
    setIsSkeleton(false);
  }, [initialRecommendedMovie]);

  const showModal = async () => {
    setLoadingMovie(true);

    if (movieDetail.totalEpisodes > 1 && movieDetail.totalSeasons >= 1) {
      setLoadingMovie(false);
      return setIsEpisodeModalOpen(true);
    }

    try {
      const data = await getSeasonListAction(movieDetail.movieId, 1, true);
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

  const handleCopyUrl = async () => {
    const url: string = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      message.success("Copied");
    } catch (error) {
      console.log(error);
      message.error("Can not copy Link to clipboard!");
    }
  };

  return (
    <div className="animate-opacityAnimated">
      <div>
        <div className="absolute h-screen w-screen brightness-[0.3] ">
          <Image
            src={`${movieDetail.thumbnail}`}
            alt="Thumbnail"
            fill
            priority
            className="rounded object-cover"
            quality={100}
            sizes="(min-width: 1024px) 100vw , (min-width: 625px) 30vw, 40vw"
          />
          <div className="absolute bottom-0 h-10 w-full bg-gradient-to-b from-transparent to-black"></div>
        </div>

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
                <div className="relative ml-3 aspect-[60/100] w-[30%]">
                  <Image
                    src={movieDetail.thumbnail}
                    alt="Thumbnail"
                    fill
                    priority
                    className="rounded object-cover"
                    quality={100}
                    sizes="(min-width: 1024px) 100vw , (min-width: 625px) 30vw, 40vw"
                  />
                </div>
              </div>

              <Tabs
                type="card"
                defaultActiveKey="Description"
                animated
                style={{ height: "fit-content" }}
                items={[
                  {
                    key: "Description",
                    label: "Description",
                    children: (
                      <Paragraph
                        ellipsis={{
                          rows: 3,
                          expandable: true,
                          symbol: "more",
                        }}
                      >
                        {movieDetail.description}
                      </Paragraph>
                    ),
                  },
                  {
                    key: "Actors",
                    label: "Actors",
                    children: (
                      <Actor castCharacteries={movieDetail.castCharacteries} />
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
                        <div className="flex items-center justify-center">
                          <LoadingIcon
                            width={20}
                            height={20}
                            fill="white"
                            className="mr-2 animate-spin"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Play
                            width={20}
                            height={20}
                            fill="white"
                            className="mr-2"
                          />
                          <span>Play</span>
                        </div>
                      )}
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
                    <Plus width={20} height={20} fill="#D1D0CF" />
                  </span>
                </Tooltip>

                <Tooltip color="#b2afaf2e" title="Like">
                  <span
                    className={`mx-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full  bg-[#b2afaf2e] p-3 transition-colors hover:bg-[#adaaaa64]`}
                  >
                    <i className="fa-regular fa-heart text-xl"></i>
                    <Heart width={20} height={20} fill="#D1D0CF" />
                  </span>
                </Tooltip>

                <Tooltip color="#b2afaf2e" title="Copy Link">
                  <span
                    className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full  bg-[#b2afaf2e] p-3 transition-colors hover:bg-[#adaaaa64]`}
                  >
                    <span onClick={handleCopyUrl}>
                      <Copy width={20} height={20} fill="#D1D0CF" />
                    </span>
                  </span>
                </Tooltip>
              </div>
            </div>
            <div className="mt-8">
              {recommendedMovie?.length ? (
                <>
                  <List
                    dataSource={recommendedMovie}
                    grid={{
                      xs: 3,
                      sm: 3,
                      md: 4,
                      lg: 5,
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
            movieId={movieDetail.movieId}
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
      {isSkeleton && <Spin spinning={isSkeleton} size="large" fullscreen />}
    </div>
  );
}
