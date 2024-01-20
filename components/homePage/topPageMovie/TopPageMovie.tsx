"use client";

import Axios from "@/utils/axios";
import { CaretRightFilled, InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Rubik_Dirt } from "@next/font/google";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Skeleton } from "antd";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

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

const TopPageMovie = () => {
  const [previewMovie, setPreviewMovie] = useState<previewMovieProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await Axios("/Movies/Newest");
        setPreviewMovie(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="text-white overflow-hidden relative h-[80vh] w-screen">
      <ReactPlayer
        url={previewMovie?.trailer}
        loop
        muted
        playing
        width={"100vw"}
        height={"80vh"}
        style={{
          backgroundSize: "contain",
          filter: "brightness(.7)",
          transform: "scale(1.35)",
        }}
        onReady={() => setIsVideoReady(true)}
      />

      <div
        style={{
          boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
        }}
        className="text-[#D1D0CF] absolute z-9 top-1/2 translate-y-[-50%] z-0 h-[80vh] w-screen px-12 flex flex-col justify-center"
      >
        {!isVideoReady ? (
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
        <div className="mt-5 flex">
          <button className="w-44 px-6 py-3 mr-8 bg-[#E50914] hover:bg-red-800 rounded text-sm font-semibold text-white transition-colors flex justify-center items-center">
            <CaretRightFilled className="text-xl" />
            <span>Play Now</span>
          </button>
          <button className="w-44 px-6 py-3 bg-gray-600/20 hover:bg-gray-600/60 rounded text-sm font-semibold text-white transition-colors flex justify-center items-center">
            <InfoCircleOutlined className="text-xl mr-2" />
            <Link href={"/detail/2"}>
              <span>Information</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopPageMovie;
