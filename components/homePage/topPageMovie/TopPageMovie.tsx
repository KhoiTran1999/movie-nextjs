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
    <div className="relative h-[40svh] overflow-hidden text-white md:h-[80svh]">
      <>
        <VideoPlayer trailer={previewMovie?.trailer} />
        <div
          style={{
            boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
          }}
          className="z-9 absolute top-1/2 z-0 mt-6 flex h-[100%] w-[100%] translate-y-[-50%] flex-col items-center justify-center px-12 text-[#D1D0CF] md:mt-0 md:items-start"
        >
          <>
            <h1
              className={`${rubik.className} order-1 my-4 line-clamp-[3] w-4/5 overflow-hidden text-ellipsis break-words text-center text-2xl tracking-wider [word-spacing:5px] md:w-2/3  md:text-left lg:text-4xl`}
            >
              {previewMovie?.englishName}
            </h1>
            <p className=" order-3 mb-4 line-clamp-[3] max-h-[148px] w-0 overflow-hidden text-ellipsis break-words text-sm md:order-2 md:w-2/5 lg:text-base">
              {previewMovie?.description}
            </p>
            <div className="order-2 mt-0 flex md:order-3 md:mt-5">
              <Link href={`/detail?id=${previewMovie?.movieId}`}>
                <button className="h-10 w-20 rounded-md bg-[#b2afaf94] text-xs text-white transition-colors hover:bg-[#adaaaa64] md:w-32 md:text-base">
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
