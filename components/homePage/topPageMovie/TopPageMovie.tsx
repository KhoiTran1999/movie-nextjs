import { Rubik_Dirt } from "@next/font/google";
import Link from "next/link";
import VideoPlayer from "./component/VideoPlayer";
import { InfoCircleOutlined } from "@ant-design/icons";

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

interface previewMovieProps {
  description: string;
  englishName: string;
  movieId: number;
  vietnamName: string;
  trailer: string;
  thumbnail: string;
}

interface TopPageMovieProps {
  previewMovie: previewMovieProps;
}

const TopPageMovie = async ({ previewMovie }: TopPageMovieProps) => {
  return (
    <div className="text-white overflow-hidden relative h-[80svh]">
      <>
        <VideoPlayer trailer={previewMovie?.trailer} />
        <div
          style={{
            boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
          }}
          className="text-[#D1D0CF] absolute z-9 top-1/2 translate-y-[-50%] z-0 h-[80vh] w-screen px-12 flex flex-col justify-center"
        >
          <>
            <h1
              className={`${rubik.className} text-7xl my-4 tracking-wider [word-spacing:5px]  w-2/3`}
            >
              {previewMovie?.englishName}
            </h1>
            <p className="w-2/5 mb-4 max-h-[148px] break-words line-clamp-[3] text-ellipsis overflow-hidden ">
              {previewMovie?.description}
            </p>
            <div className="mt-5 flex ">
              <Link href={`/detail?id=${previewMovie?.movieId}`}>
                <button className="w-32 h-10 text-white rounded-md bg-[#b2afaf94] hover:bg-[#adaaaa64] transition-colors">
                  <InfoCircleOutlined className="mr-3" />
                  Details
                </button>
              </Link>
            </div>
          </>
        </div>
      </>
    </div>
  );
};

export default TopPageMovie;
