"use client";

import NavigationMovie from "@/components/navigationMovie/NavigationMovie";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Rubik_Dirt } from "@next/font/google";
import {
  CaretRightFilled,
  StarFilled,
  PlusOutlined,
  LikeOutlined,
  ShareAltOutlined,
  FireFilled,
} from "@ant-design/icons";
import Image from "next/image";
import { Tabs, Tooltip, Modal } from "antd";
import { Actor } from "@/components/actorList/Actor";
import { useEffect, useMemo, useRef, useState } from "react";
import Axios from "@/utils/axios";
import { Introduction } from "@/components/introduction/Introduction";
import { EpisodeModal } from "@/components/episodeModal/EpisodeModal";
import { ExplainModal } from "@/components/explainModal/ExplainModal";
import { useRouter } from "next/navigation";
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
  const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState<boolean>(false);

  const showModal = () => {
    const isFirstTime = localStorage.getItem("isFirstTime");
    if (!isFirstTime) {
      localStorage.setItem("isFirstTime", "false");
      window.open(
        "https://thptanlac-my.sharepoint.com/:v:/g/personal/ttlhmax1193_thptanlac_onmicrosoft_com/EXWxoEzAh3dLvKgX2rJ777QBocst7u5_6d5yZdWNKPs8Qg",
        "_blank"
      );
      window.location.reload();
      return;
    }
    if (data.totalEpisodes > 1 || data.totalSeasons > 1)
      return setIsEpisodeModalOpen(true);

    router.push(
      "https://thptanlac-my.sharepoint.com/personal/ttlhmax1193_thptanlac_onmicrosoft_com/_layouts/15/embed.aspx?id=%2Fpersonal%2Fttlhmax1193%5Fthptanlac%5Fonmicrosoft%5Fcom%2FDocuments%2Fmovies%2FCinema%20Film%2FY%C3%AAu%20L%E1%BA%A1i%20V%E1%BB%A3%20Ng%E1%BA%A7u%20%2D%20Love%20Reset%20%282023%29%20Vietsub%20fullHD%5F2%2Ets&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview"
    );
  };

  const handleCancel = () => {
    setIsEpisodeModalOpen(false);
  };

  useEffect(() => {
    const fetchAPI = async () => {
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
    };
    fetchAPI();
  }, []);

  return (
    <>
      {loading ? (
        <Introduction />
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
                  <CaretRightFilled className="text-xl" />
                  <span>Play Now</span>
                </button>
                <Tooltip color="grey" title="Add watch list">
                  <span
                    className={`transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 w-11 h-11 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
                  >
                    <PlusOutlined className="text-xl" />
                  </span>
                </Tooltip>

                <Tooltip color="grey" title="Like">
                  <span
                    className={`mx-3 transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 w-11 h-11 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
                  >
                    <LikeOutlined className="text-xl" />
                  </span>
                </Tooltip>

                <Tooltip color="grey" title="Share">
                  <span
                    className={`transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 w-11 h-11 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
                  >
                    <ShareAltOutlined className="text-xl" />
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
            />
          </Modal>
        </div>
      )}
    </>
  );
}
