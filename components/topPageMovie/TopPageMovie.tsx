"use client";

import Axios from "@/utils/axios";
import { CaretRightFilled, InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Rubik_Dirt } from "@next/font/google";
import ReactPlayer from "react-player/youtube";

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await Axios("/Movies/Newest");
  //       setPreviewMovie(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <div className="text-white mb-4 overflow-hidden relative h-[80vh] w-screen">
        {/* {previewMovie ? (
          <ReactPlayer
            url={"https://www.youtube.com/watch?v=nS12Fbtgr5A"}
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
          />
        ) : (
          <img
            src="https://7z363nlh6c.execute-api.us-east-1.amazonaws.com/v1/storage-movie-data/2.jpg"
            alt="thumbnail"
            className="w-screen h-[80vh] bg-contain "
          />
        )} */}

        <ReactPlayer
          url={"https://www.youtube.com/watch?v=nS12Fbtgr5A"}
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
        />

        <div
          style={{
            boxShadow: "0px -255px 44px -215px rgba(0,0,0,1) inset",
          }}
          className="text-[#D1D0CF] absolute z-9 top-1/2 translate-y-[-50%] z-0 h-[80vh] w-screen px-12 flex flex-col justify-center"
        >
          <h1
            className={`${rubik.className} text-7xl my-4 tracking-wider [word-spacing:5px] animate-wiggle w-1/2`}
          >
            BACK TO THE FUTURE 4
          </h1>
          <p className="w-2/5 mb-4 max-h-[148px] break-words line-clamp-[5] text-ellipsis overflow-hidden animate-wiggle">
            In "Back to the Future 4" Tom Holland takes on the role of a
            brilliant young inventor, Jake McFly, who stumbles upon Doc Brown's
            long-lost journal. The journal contains secrets to enhance time
            travel capabilities, opening up new possibilities and unforeseen
            consequences. As Jake navigates through various timelines, he
            encounters both familiar faces and new challenges, all while trying
            to prevent a mysterious adversary from rewriting history.
          </p>
          <div className="mt-5 flex">
            <button className="w-44 px-6 py-3 mr-8 bg-[#E50914] hover:bg-red-800 rounded text-sm font-semibold text-white transition-colors flex justify-center items-center">
              <CaretRightFilled className="text-xl" />
              <span>Play Now</span>
            </button>
            <button className="w-44 px-6 py-3 bg-gray-600/20 hover:bg-gray-600/60 rounded text-sm font-semibold text-white transition-colors flex justify-center items-center">
              <InfoCircleOutlined className="text-xl mr-2" />
              <span>Information</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPageMovie;
