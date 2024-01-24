"use client";

import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import dynamic from "next/dynamic";
import { Rubik_Dirt } from "@next/font/google";
import { StarFilled, FireFilled } from "@ant-design/icons";
import { Tabs, Tooltip, Modal, message, Button, Result } from "antd";
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

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

interface detailProps {
  castCharacteries: [];
  categories: [];
  producedDate: string;
  dateUpdated: string;
  description: string;
  englishName: string;
  feature: {};
  mark: number;
  movieId: string;
  nation: {};
  producer: {};
  thumbnail: string;
  time: number;
  totalEpisodes: number;
  totalSeasons: number;
  trailer: string;
  vietnamName: string;
  viewer: number;
}

interface seasonProps {
  seasonId: string;
  seasonNumber: number;
  name: string;
  episodes: episodeProps[];
}

interface episodeProps {
  episodeId: string;
  episodeNumber: number;
  name: string;
  video: string;
  dateCreated: string;
  dateUpdated: string;
}

export default function MainDetailPage({ ...props }: detailProps) {
  const dispatch = useDispatch();

  const [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState<boolean>(false);
  const [isWatchModalOpen, setIsWatchModalOpen] = useState<boolean>(false);
  const [isTrailerError, setIsTrailerError] = useState<boolean>(false);
  const [watchMovie, setWatchMovie] = useState<seasonProps>({
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

  const iframeVideoRef = useRef<any>();

  const showModal = async () => {
    setLoadingMovie(true);
    if (props.totalEpisodes > 1 || props.totalSeasons > 1) {
      setLoadingMovie(false);
      return setIsEpisodeModalOpen(true);
    }

    try {
      const res = await fetch(
        `${process.env.API_URL}/Seasons?movieId=${props.movieId}&seasonNumber=1`
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

    //Take back iframe props
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

  const handleAfterClose = () => {
    let iframeVideo: HTMLIFrameElement | null = document.getElementById(
      "iframeVideo"
    ) as HTMLIFrameElement;
    iframeVideoRef.current = iframeVideo.src;

    //remove iframe props
    iframeVideo.src = "";
  };

  useEffect(() => {
    const canPlay = ReactPlayerTest.canPlay(props.trailer);
    if (!canPlay) setIsTrailerError(true);
  }, []);

  return (
    <div>
      <NavigationMovie />

      {isTrailerError ? (
        <Result
          status="404"
          title="Something went wrong with Trailer"
          subTitle="Sorry, We will update later."
          className="mt-11"
        />
      ) : (
        <ReactPlayer
          url={props.trailer}
          playing
          muted
          controls
          width={"100svw"}
          height={"80svh"}
        />
      )}

      <div
        className={`${
          isTrailerError ? "!mt-16" : ""
        } flex justify-center items-start my-8 `}
      >
        <div
          style={{
            boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
          }}
          className="w-1/2 mr-2 text-[#D1D0CF] flex flex-col justify-center"
        >
          <h1
            className={`${rubik.className} text-7xl my-4 tracking-wider [word-spacing:5px]  w-full`}
          >
            {props.englishName}
          </h1>
          <h2>{props.vietnamName}</h2>
          <div className="my-4">
            <span>{props.producedDate.slice(0, 4)}</span>
            <span className="mx-4">{props.time} minutes</span>
            <span>
              {props.mark}/10 <StarFilled className="text-yellow-400" />
            </span>
            <ul className="mt-2 flex items-center flex-wrap">
              {props.categories.map(
                (val: { categoryId: number; name: string }, idx) => {
                  if (idx + 1 < props.categories.length) {
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
          <Tabs
            type="card"
            defaultActiveKey="Description"
            items={[
              {
                key: "Description",
                label: "Description",
                children: props.description,
              },
              {
                key: "Actors",
                label: "Actors",
                children: <Actor castCharacteries={props.castCharacteries} />,
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
            >
              <i className="fa-duotone fa-play text-xl mr-2"></i>
              <span>Play Now</span>
            </Button>
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
        <img
          src={props.thumbnail}
          alt="thumbnail"
          style={{ borderRadius: "10px" }}
          className="w-[20%]"
        />
      </div>
      <Modal
        centered
        open={isEpisodeModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EpisodeModal
          movieId={props.movieId}
          totalSeasons={props.totalSeasons}
          englishName={props.englishName}
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
        title={props.englishName}
      >
        <WatchModal
          episodeNumber={watchMovie?.episodes[0]?.episodeNumber}
          seasonNumber={watchMovie?.seasonNumber}
          name={watchMovie?.episodes[0]?.name}
          video={watchMovie?.episodes[0]?.video}
        />
      </Modal>
    </div>
  );
}
