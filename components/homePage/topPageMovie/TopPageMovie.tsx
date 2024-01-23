import Axios from "@/utils/axios";
import { CaretRightFilled, InfoCircleOutlined } from "@ant-design/icons";
import { Rubik_Dirt } from "@next/font/google";
import Link from "next/link";
import { Skeleton } from "antd";
import VideoPlayer from "./component/VideoPlayer";

interface previewMovieProps {
  description: string;
  englishName: string;
  movieId: number;
  vietnamName: string;
  trailer: string;
  thumbnail: string;
}

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

const TopPageMovie = async () => {
  const res = await Axios("/Movies/Newest");
  const previewMovie: previewMovieProps = res.data;

  return (
    <div className="text-white overflow-hidden relative h-[80vh] w-screen">
      <VideoPlayer trailer={previewMovie?.trailer} />

      <div
        style={{
          boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
        }}
        className="text-[#D1D0CF] absolute z-9 top-1/2 translate-y-[-50%] z-0 h-[80vh] w-screen px-12 flex flex-col justify-center"
      >
        {!previewMovie ? (
          <Skeleton
            active
            paragraph={{
              rows: 3,
              style: { width: "50%" },
            }}
            title={{ style: { height: "50px" } }}
          />
        ) : (
          <>
            <h1
              className={`${rubik.className} text-7xl my-4 tracking-wider [word-spacing:5px] animate-wiggle w-2/3`}
            >
              {previewMovie?.englishName}
            </h1>
            <p className="w-2/5 mb-4 max-h-[148px] break-words line-clamp-[3] text-ellipsis overflow-hidden animate-wiggle">
              {previewMovie?.description}
            </p>
          </>
        )}
        <div className="mt-5 flex animate-wiggle">
          <button className="w-44 px-6 py-3 bg-[#E50914] hover:bg-red-800 rounded text-sm font-semibold text-white transition-colors flex justify-center items-center">
            <CaretRightFilled className="text-xl mr-2" />
            <Link href={`/detail?id=${previewMovie?.movieId}`}>
              <span>Watch</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopPageMovie;
