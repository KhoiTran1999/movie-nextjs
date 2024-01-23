import Axios from "@/utils/axios";
import { useEffect, useRef, useState } from "react";
import { Select, Spin, Modal } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { Rubik_Dirt } from "@next/font/google";
import { useRouter } from "next/navigation";
import { WatchModal } from "../watchModal/WatchModal";

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

export const EpisodeModal = ({
  movieId,
  totalSeasons,
  englishName,
}: movieProps) => {
  const router = useRouter();

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

  const iframeVideoRef = useRef<any>();
  const optionSelectRef = useRef(() => {
    const optionList = Array.from({ length: 3 }, (_, idx) => {
      return { value: idx + 1, label: `Season ${idx + 1}` };
    });
    return optionList;
  });

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      const res = await Axios("Seasons", {
        params: {
          movieId,
          seasonNumber,
        },
      });
      setSeason(res.data[0]);
      setIsLoading(false);
    };
    fetchAPI();
  }, [seasonNumber]);

  const hanldeClickEpisode = (
    episodeNumber: number,
    name: string,
    video: string
  ) => {
    setIsWatchModalOpen(true);
    setWatchMovie({ episodeNumber, seasonNumber, name, video });

    //Take back iframe data
    let iframeVideo: HTMLIFrameElement | null = document.getElementById(
      "iframeVideo"
    ) as HTMLIFrameElement;
    if (iframeVideo) iframeVideo.src = iframeVideoRef.current;
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

  return (
    <div>
      <div className=" flex justify-between items-center">
        <h3 className="text-2xl">Episode</h3>
        {totalSeasons > 1 ? (
          <Select
            defaultValue={1}
            onChange={(val: number) => setSeasonNumber(val)}
            options={optionSelectRef.current()}
            size="large"
          />
        ) : (
          <h3 className="text-2xl">{season?.name}</h3>
        )}
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spin />
          </div>
        ) : (
          <ul className="px-3 max-h-[70svh] overflow-y-auto">
            {season?.episodes.map((val: episodeProps, idx) => (
              <li
                key={idx}
                onClick={() =>
                  hanldeClickEpisode(val.episodeNumber, val.name, val.video)
                }
                className="group hover:scale-105 px-5 py-2 mb-4 bg-[#605f5f96] rounded-md flex justify-between items-center cursor-pointer transition-all relative"
              >
                <span className={`${rubik.className} text-4xl font-bold`}>
                  {val.episodeNumber}
                </span>
                <span className="text-xl mx-4 font-semibold max-w-[320px]">
                  {val.name}
                </span>
                <CaretRightFilled className="text-2xl opacity-0 translate-x-[-100px] group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </li>
            ))}
            <Modal
              open={isWatchModalOpen}
              centered
              width={"70svw"}
              onCancel={handleCancelWatch}
              footer={null}
              styles={{ body: { paddingTop: "20px", paddingBottom: "10px" } }}
              afterClose={handleAfterClose}
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
              />
            </Modal>
          </ul>
        )}
      </div>
    </div>
  );
};
