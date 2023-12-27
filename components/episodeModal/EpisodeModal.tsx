import Axios from "@/utils/axios";
import { useEffect, useRef, useState } from "react";
import { Modal, Select, Spin } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { Rubik_Dirt } from "@next/font/google";
import { ExplainModal } from "../explainModal/ExplainModal";
import { useRouter } from "next/navigation";

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

type movieProps = {
  movieId: string;
  totalSeasons: number;
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

export const EpisodeModal = ({ movieId, totalSeasons }: movieProps) => {
  const router = useRouter();

  const [season, setSeason] = useState<seasonProps>();
  const [seasonNumber, setSeasonNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const hanldeClickEpisode = () => {
    router.push(
      "https://thptanlac-my.sharepoint.com/personal/ttlhmax1193_thptanlac_onmicrosoft_com/_layouts/15/embed.aspx?id=%2Fpersonal%2Fttlhmax1193%5Fthptanlac%5Fonmicrosoft%5Fcom%2FDocuments%2Fmovies%2FCinema%20Film%2FY%C3%AAu%20L%E1%BA%A1i%20V%E1%BB%A3%20Ng%E1%BA%A7u%20%2D%20Love%20Reset%20%282023%29%20Vietsub%20fullHD%5F2%2Ets&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview"
    );
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
          <ul>
            {season?.episodes.map((val: episodeProps, idx) => (
              <li
                key={idx}
                onClick={hanldeClickEpisode}
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
          </ul>
        )}
      </div>
    </div>
  );
};
