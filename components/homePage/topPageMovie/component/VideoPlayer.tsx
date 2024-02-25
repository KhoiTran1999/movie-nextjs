"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
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

interface VideoType {
  previewMovie: previewMovieProps;
}

const VideoPlayer = ({ previewMovie }: VideoType) => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    if (screen) {
      setScreenWidth(screen.width);
    }
  }, []);

  return (
    <div className="h-[50svh] sm:h-[70svh]">
      <div className="hidden sm:block">
        {screenWidth > 640 && (
          <ReactPlayer
            url={previewMovie.trailer}
            loop
            muted
            playing
            width={"100svw"}
            height={"80svh"}
            style={{
              backgroundSize: "contain",
              backgroundPosition: "center center",
              filter: "brightness(.7)",
              scale: 1.45,
              backgroundColor: "black",
            }}
          />
        )}
      </div>
      <div className="relative inline-block h-full w-full sm:hidden">
        <img
          className="h-full w-full object-cover brightness-50"
          src={previewMovie.thumbnail}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/errorThumbnail.jpg";
          }}
        ></img>
        <div className="absolute bottom-0 h-10 w-full bg-gradient-to-b from-transparent to-black"></div>
      </div>
    </div>
  );
};

export default VideoPlayer;
