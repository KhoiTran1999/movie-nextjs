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
import ReactPlayerTest from "react-player/youtube";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SeasonMovieDetail } from "@/types";
import CardMovie from "../homePage/cardSlider/CardMovie";

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

type movieProps = {
  movieId: string;
  mark: number;
  time: number;
  vietnamName: string;
  englishName: string;
  thumbnail: string;
  totalSeasons: number;
  totalEpisodes: number;
  dateCreated: string;
};

export default function MainDetailPage(props: any) {
  const { movieDetail, recommendedMovie } = props;

  const dispatch = useDispatch();

  const [isSkeleton, setIsSkeleton] = useState<boolean>(false);
  const [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState<boolean>(false);
  const [isWatchModalOpen, setIsWatchModalOpen] = useState<boolean>(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState<boolean>(false);
  const [isTrailerError, setIsTrailerError] = useState<boolean>(false);
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
    console.log("props: ", props);

    if (movieDetail) {
      setIsSkeleton(false);
    }
  }, [props]);

  const iframeVideoRef = useRef<any>();

  const showModal = async () => {
    setLoadingMovie(true);

    if (movieDetail.totalEpisodes > 1 && movieDetail.totalSeasons >= 1) {
      setLoadingMovie(false);
      return setIsEpisodeModalOpen(true);
    }

    try {
      const res = await fetch(
        `${process.env.API_URL}/Seasons?movieId=${movieDetail.movieId}&seasonNumber=1`
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

    //Take back iframe movieDetail
    let iframeVideo: HTMLIFrameElement | null = document.getElementById(
      "iframeVideo"
    ) as HTMLIFrameElement;
    if (iframeVideo) iframeVideo.src = iframeVideoRef.current;
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

  const handleAfterClose = () => {
    let iframeVideo: HTMLIFrameElement | null = document.getElementById(
      "iframeVideo"
    ) as HTMLIFrameElement;
    iframeVideoRef.current = iframeVideo.src;

    //remove iframe movieDetail
    iframeVideo.src = "";
  };

  useEffect(() => {
    const canPlay = ReactPlayerTest.canPlay(movieDetail.trailer);
    if (!canPlay) setIsTrailerError(true);
  }, []);

  return (
    <div>
      <NavigationMovie />
      {isSkeleton ? (
        <div className="max-w-[700px] mt-14 w-full m-auto">
          <div className="flex">
            <div className="w-[240px] h-[150px] animate-pulse bg-[#ffffff3f] rounded-md mr-3"></div>
            <div className="w-[240px] h-[150px] animate-pulse bg-[#ffffff3f] rounded-md mr-3"></div>
            <div className="w-[240px] h-[150px] animate-pulse bg-[#ffffff3f] rounded-md"></div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="w-screen h-screen absolute brightness-[0.3]"
            style={{
              backgroundImage: `url("/errorThumbnail.jpg")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
            }}
          ></div>
          <div
            className="w-screen h-screen absolute brightness-[0.3]"
            style={{
              background: `url("${movieDetail.thumbnail}"`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
            }}
          ></div>
          <div className={`py-8 max-w-[1200px] w-full m-auto backdrop-blur-sm`}>
            <div className="max-w-[700px] mt-14 w-full m-auto text-[#D1D0CF]">
              <div className="flex items-center">
                <div className="w-[60%]">
                  <h1
                    className={`${rubik.className} text-5xl my-4 tracking-wider [word-spacing:5px]  w-full`}
                  >
                    {movieDetail.englishName}
                  </h1>
                  <h2 className="font-bold">{movieDetail.vietnamName}</h2>
                  <div className="my-4">
                    <span>{movieDetail.producedDate.slice(0, 4)}</span>
                    <span className="mx-4">{movieDetail.time} minutes</span>
                    <span>
                      {movieDetail.mark}/10{" "}
                      <StarFilled className="text-yellow-400" />
                    </span>
                    <ul className="mt-2 flex items-center flex-wrap">
                      {movieDetail.categories.map(
                        (
                          val: { categoryId: number; name: string },
                          idx: number
                        ) => {
                          if (idx + 1 < movieDetail.categories.length) {
                            return (
                              <li className="mr-2" key={val.categoryId}>
                                <span className="mr-2 hover:text-[#E50914] cursor-pointer">
                                  {val.name}
                                </span>
                                <FireFilled className="text-xs text-[#E50914]" />
                              </li>
                            );
                          }
                          return (
                            <li className="mr-2" key={val.categoryId}>
                              <span className=" hover:text-[#E50914] cursor-pointer">
                                {val.name}
                              </span>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                </div>
                <div className="w-[30%] overflow-hidden">
                  <LazyLoadImage
                    alt="Thumbnail"
                    src={movieDetail.thumbnail}
                    effect="blur"
                    loading="lazy"
                    className="w-full h-full rounded-md object-cover"
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
                      <Actor castCharacteries={movieDetail.castCharacteries} />
                    ),
                  },
                ]}
              />
              <div className="mt-10 flex justify-start items-center">
                <Button
                  size="large"
                  onClick={showModal}
                  loading={loadingMovie}
                  type="primary"
                  className="mr-3"
                  disabled={movieDetail.totalSeasons === 0}
                >
                  {movieDetail.totalSeasons > 0 ? (
                    <>
                      <i className="fa-duotone fa-play text-xl mr-2"></i>
                      <span>Play Now</span>
                    </>
                  ) : (
                    <span>Upcoming...</span>
                  )}
                </Button>

                <button
                  onClick={() => setIsTrailerModalOpen(true)}
                  className="w-[121px] h-10 mr-3 text-white rounded-md bg-[#b2afaf2e] hover:bg-[#adaaaa64] transition-colors"
                >
                  <InfoCircleOutlined />
                  <span className="ml-3">Trailer</span>
                </button>

                <Tooltip color="grey" title="Add watch list">
                  <span
                    className={`transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 w-11 h-11 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
                  >
                    <i className="fa-regular fa-plus text-xl"></i>
                  </span>
                </Tooltip>

                <Tooltip color="grey" title="Like">
                  <span
                    className={`mx-3 transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 w-11 h-11 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
                  >
                    <i className="fa-regular fa-heart text-xl"></i>
                  </span>
                </Tooltip>

                <Tooltip color="grey" title="Share">
                  <span
                    className={`transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 w-11 h-11 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
                  >
                    <i className="fa-light fa-share-from-square text-xl"></i>
                  </span>
                </Tooltip>
              </div>
            </div>
            <div className="mt-8 px-4">
              <h3 className="font-bold text-2xl text-red-700">
                Recommended Movie
              </h3>
              <List
                dataSource={recommendedMovie}
                grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5, gutter: 12 }}
                renderItem={(val: movieProps, idx: number) => (
                  <div onClick={() => setIsSkeleton(true)}>
                    <CardMovie val={val} />
                  </div>
                )}
              />
            </div>
          </div>
          <Modal
            centered
            open={isEpisodeModalOpen}
            onCancel={handleCancel}
            footer={null}
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
            afterClose={handleAfterClose}
            title={movieDetail.englishName}
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
          >
            {isTrailerError ? (
              <Result
                status="error"
                title="Something went wrong with Trailer"
                subTitle={
                  <span className="text-white text-lg">
                    Sorry, We will update later.
                  </span>
                }
                className="mt-20"
              />
            ) : (
              <ReactPlayer
                url={movieDetail.trailer}
                playing
                controls
                loop
                width={"100%"}
                height={"70svh"}
                style={{ backgroundColor: "black" }}
              />
            )}
          </Modal>
        </div>
      )}
    </div>
  );
}
