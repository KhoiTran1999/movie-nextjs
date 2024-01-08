"use client";

import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import dynamic from "next/dynamic";
import { Rubik_Dirt } from "@next/font/google";
import { StarFilled, FireFilled } from "@ant-design/icons";
import { Tabs, Tooltip, Modal, Button, Result } from "antd";
import { Actor } from "@/components/detailPage/actorList/Actor";
import { useEffect, useMemo, useRef, useState } from "react";
import Axios from "@/utils/axios";
import { Introduction } from "@/components/introduction/Introduction";
import { EpisodeModal } from "@/components/detailPage/episodeModal/EpisodeModal";
import { useRouter } from "next/navigation";
import { WatchModal } from "@/components/detailPage/watchModal/WatchModal";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

interface detailProps {
  castCharacteries: [];
  categories: [];
  dateCreated: string;
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

export default function Detail() {
  const router = useRouter();

  const [data, setData] = useState<detailProps>({
    castCharacteries: [],
    categories: [],
    dateCreated: "",
    dateUpdated: "",
    description: "",
    englishName: "",
    feature: {},
    mark: 0,
    movieId: "",
    nation: {},
    producer: {},
    thumbnail: "",
    time: 0,
    totalEpisodes: 0,
    totalSeasons: 0,
    trailer: "",
    vietnamName: "",
    viewer: 0,
  });

  const [tabItem, setTabItem] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState<boolean>(false);
  const [isWatchModalOpen, setIsWatchModalOpen] = useState<boolean>(false);
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

  const showModal = () => {
    if (data.totalEpisodes > 1 || data.totalSeasons > 1)
      return setIsEpisodeModalOpen(true);

    setIsWatchModalOpen(true);

    //Take back iframe data
    let iframeVideo: HTMLIFrameElement | null = document.getElementById(
      "iframeVideo"
    ) as HTMLIFrameElement;
    if (iframeVideo) iframeVideo.src = iframeVideoRef.current;

    const fetchAPI = async () => {
      try {
        const res = await Axios("Seasons", {
          params: {
            movieId: data.movieId,
            seasonNumber: 1,
          },
        });
        setWatchMovie(res.data[0]);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };
    fetchAPI();
  };

  const handleCancel = () => {
    setIsEpisodeModalOpen(false);
  };

  const handleCancelWatch = () => {
    setIsWatchModalOpen(false);
  };

  const handleAfterClose = () => {
    let iframeVideo: HTMLIFrameElement | null = document.getElementById(
      "iframeVideo"
    ) as HTMLIFrameElement;
    iframeVideoRef.current = iframeVideo.src;

    //remove iframe data
    iframeVideo.src = "";
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await Axios("Movie/ca7274ea-0f24-4d20-88a7-d7605c449be9");
        setData(res.data);
        setTabItem([
          {
            key: "Description",
            label: "Description",
            children: res.data.description,
          },
          {
            key: "Actors",
            label: "Actors",
            children: <Actor castCharacteries={res.data.castCharacteries} />,
          },
        ]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };
    fetchAPI();
  }, []);

  return (
    <>
      {loading ? (
        <>
          {isError ? (
            <Result
              status="500"
              title="Sorry, something went wrong"
              extra={
                <Button type="primary" href="/">
                  Back Home
                </Button>
              }
            />
          ) : (
            <Introduction />
          )}
        </>
      ) : (
        <div>
          <NavigationMovie />
          <ReactPlayer
            url={data.trailer}
            playing
            controls
            width={"100svw"}
            height={"80svh"}
            style={{ marginTop: "82px" }}
          />
          <div className="flex justify-center items-start my-8">
            <div
              style={{
                boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
              }}
              className="w-1/2 mr-2 text-[#D1D0CF] flex flex-col justify-center"
            >
              <h1
                className={`${rubik.className} text-7xl my-4 tracking-wider [word-spacing:5px] animate-wiggle w-full`}
              >
                {data.englishName}
              </h1>
              <h2>{data.vietnamName}</h2>
              <div className="my-4">
                <span>{data.dateCreated.slice(0, 4)}</span>
                <span className="mx-4">{data.time} minutes</span>
                <span>
                  {data.mark}/10 <StarFilled className="text-yellow-400" />
                </span>
                <ul className="mt-2 flex items-center flex-wrap">
                  {data.categories.map(
                    (val: { categoryId: number; name: string }, idx) => {
                      if (idx + 1 < data.categories.length) {
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
                items={tabItem}
              />
              <div className="mt-5 flex">
                <button
                  onClick={showModal}
                  className="w-44 px-6 py-3 mr-8 bg-[#E50914] hover:bg-red-800 rounded text-sm font-semibold text-white transition-colors flex justify-center items-center"
                >
                  <i className="fa-duotone fa-play text-xl mr-2"></i>
                  <span>Play Now</span>
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
            <img
              src={data.thumbnail}
              alt="thumbnail"
              style={{ borderRadius: "10px" }}
              className="w-[20%]"
            />
          </div>
          <Modal
            centered
            open={isEpisodeModalOpen}
            onCancel={handleCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
          >
            <EpisodeModal
              movieId={data.movieId}
              totalSeasons={data.totalSeasons}
              englishName={data.englishName}
            />
          </Modal>
          <Modal
            open={isWatchModalOpen}
            centered
            width={"70svw"}
            onCancel={handleCancelWatch}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            styles={{ body: { paddingTop: "20px", paddingBottom: "10px" } }}
            afterClose={handleAfterClose}
          >
            <WatchModal
              episodeNumber={watchMovie?.episodes[0].episodeNumber}
              seasonNumber={watchMovie?.seasonNumber}
              name={watchMovie?.episodes[0].name}
              video={watchMovie?.episodes[0].video}
            />
          </Modal>
        </div>
      )}
    </>
  );
}
