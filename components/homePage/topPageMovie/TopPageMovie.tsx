import { Rubik_Dirt } from "next/font/google";
import Link from "next/link";
import VideoPlayer from "./component/VideoPlayer";
import { InfoCircleOutlined } from "@ant-design/icons";
import { CategoryType } from "@/types";
import { useMemo } from "react";
import slugify from "slugify";
import { Dot } from "@/public/dot";

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
  tag: string;
  categories: CategoryType[];
}

interface TopPageMovieProps {
  previewMovie: previewMovieProps;
}

const TopPageMovie = async ({ previewMovie }: TopPageMovieProps) => {
  const slug = useMemo(() => {
    return slugify(
      `${previewMovie?.englishName}-${previewMovie?.vietnamName}`,
      {
        lower: true,
        locale: "vi",
        strict: true,
      },
    );
  }, []);
  return (
    <div className="relative animate-opacityAnimated overflow-hidden text-white">
      <>
        <VideoPlayer previewMovie={previewMovie} />
        <div className="z-9 absolute top-1/2 z-0 mt-6 flex h-[100%] w-[100%] translate-y-[-50%] flex-col items-center justify-center px-12 text-[#D1D0CF] md:mt-0 md:items-start">
          <>
            <div className="order-1 mb-2 rounded bg-[red] p-1 text-[10px] font-medium text-[white] sm:text-xs ">
              {previewMovie?.tag}
            </div>
            <h1
              className={`${rubik.className} order-2 mb-4 line-clamp-[3] w-4/5 overflow-hidden text-ellipsis break-words text-center text-2xl tracking-wider [word-spacing:5px] md:w-2/3  md:text-left lg:text-4xl`}
            >
              {previewMovie?.englishName}
            </h1>

            <p className=" order-5 mb-4 line-clamp-[3] max-h-[148px] w-0 overflow-hidden text-ellipsis break-words text-sm md:order-3  md:w-2/5 lg:text-base">
              {previewMovie?.description}
            </p>
            <ul className="order-3 mb-2 mt-0 flex flex-wrap items-center md:order-4">
              {previewMovie?.categories.map(
                (val: { categoryId: number; name: string }, idx: number) => {
                  if (idx + 1 < previewMovie?.categories.length) {
                    return (
                      <li
                        className="mr-2 flex items-center"
                        key={val.categoryId}
                      >
                        <span className="mr-2 cursor-pointer text-[12px] hover:text-[#E50914] sm:text-sm">
                          {val.name}
                        </span>
                        <Dot width={6} height={6} fill="red" />
                      </li>
                    );
                  }
                  return (
                    <li className="mr-2" key={val.categoryId}>
                      <span className=" cursor-pointer text-[12px] hover:text-[#E50914] sm:text-sm">
                        {val.name}
                      </span>
                    </li>
                  );
                },
              )}
            </ul>
            <div className="order-4 mt-0 flex md:order-5 md:mt-4">
              <Link href={`/detail/${slug}.html/${previewMovie?.movieId}`}>
                <button className="rounded-md bg-[#b2afaf94] px-3 py-2 text-xs text-white transition-colors hover:bg-[#adaaaa64] md:w-32 md:text-base">
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
