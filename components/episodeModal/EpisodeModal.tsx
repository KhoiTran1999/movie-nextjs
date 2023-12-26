import Axios from "@/utils/axios";
import { useEffect, useRef, useState } from "react";
import { Select } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { Rubik_Dirt } from "@next/font/google";

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
  const [season, setSeason] = useState<seasonProps>();
  const [seasonNumber, setSeasonNumber] = useState<number>(1);
  const optionSelectRef = useRef(() => {
    const optionList = Array.from({ length: 3 }, (_, idx) => {
      return { value: idx + 1, label: `Season ${idx + 1}` };
    });
    return optionList;
  });

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await Axios("Seasons", {
        params: {
          movieId,
          seasonNumber,
        },
      });
      setSeason(res.data[0]);
    };
    fetchAPI();
  }, [seasonNumber]);

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
        <ul>
          {season?.episodes.map((val: episodeProps, idx) => (
            <li className="group hover:scale-105 px-5 py-2 mb-4 bg-[#605f5f96] rounded-md flex justify-between items-center cursor-pointer transition-all relative">
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
      </div>
    </div>
  );
};
