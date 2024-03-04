"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Select, Spin, Modal } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { Rubik_Dirt } from "next/font/google";
const WatchModal = dynamic(() => import("../watchModal/WatchModal"), {
  ssr: false,
});

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

type movieProps = {
  movieId: string;
  totalSeasons: number;
  englishName: string;
};

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

interface watchMovieType {
  episodeNumber: number;
  seasonNumber: number;
  name: string;
  video: string;
}

const EpisodeModal = ({ movieId, totalSeasons, englishName }: movieProps) => {
  const [season, setSeason] = useState<seasonProps>();
  const [seasonNumber, setSeasonNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWatchModalOpen, setIsWatchModalOpen] = useState<boolean>(false);
  const [watchMovie, setWatchMovie] = useState<watchMovieType>({
    episodeNumber: 1,
    seasonNumber: 1,
    name: "",
    video: "",
  });

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Seasons?movieId=${movieId}&seasonNumber=${seasonNumber}`,
      );
      const data = await res.json();

      setSeason(data[0]);
      setIsLoading(false);
    };
    fetchAPI();
  }, [seasonNumber]);

  const hanldeClickEpisode = (
    episodeNumber: number,
    name: string,
    video: string,
  ) => {
    setIsWatchModalOpen(true);
    setWatchMovie({ episodeNumber, seasonNumber, name, video });
  };

  const handleCancelWatch = () => {
    setIsWatchModalOpen(false);
  };

  return (
    <div>
      <div className=" flex items-center justify-between">
        <h3 className="text-2xl">Episode</h3>
        {totalSeasons > 1 ? (
          <Select
            defaultValue={1}
            onChange={(val: number) => setSeasonNumber(val)}
            size="large"
          />
        ) : (
          <h3 className="text-2xl">{totalSeasons > 1 && season?.name}</h3>
        )}
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spin />
          </div>
        ) : (
          <ul className="max-h-[70svh] overflow-y-auto px-3">
            {season?.episodes.map((val: episodeProps, idx) => (
              <li
                key={idx}
                onClick={() =>
                  hanldeClickEpisode(val.episodeNumber, val.name, val.video)
                }
                className="group relative mb-4 flex cursor-pointer items-center justify-between rounded-md bg-[#605f5f96] px-5 py-2 transition-all hover:scale-105"
              >
                <span className={`${rubik.className} text-4xl font-bold`}>
                  {val.episodeNumber}
                </span>
                <span className="mx-4 max-w-[320px] text-xl font-semibold">
                  {val.name}
                </span>
                <CaretRightFilled className="translate-x-[-100px] text-2xl opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </li>
            ))}
            <Modal
              open={isWatchModalOpen}
              centered
              width={"70svw"}
              onCancel={handleCancelWatch}
              footer={null}
              styles={{ body: { paddingTop: "20px", paddingBottom: "10px" } }}
              destroyOnClose={!isWatchModalOpen}
              title={`${
                !watchMovie.name
                  ? englishName + " - Episode " + watchMovie.episodeNumber
                  : watchMovie.name + " - Episode " + watchMovie.episodeNumber
              } - Season ${seasonNumber}`}
            >
              <WatchModal
                episodeNumber={watchMovie.episodeNumber}
                seasonNumber={watchMovie.seasonNumber}
                name={watchMovie.name}
                video={watchMovie.video}
                movieId={movieId}
              />
            </Modal>
          </ul>
        )}
      </div>
    </div>
  );
};

export default EpisodeModal;
