"use client";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

interface VideoType {
  trailer: string;
}

const VideoPlayer = ({ trailer }: VideoType) => {
  return (
    <ReactPlayer
      url={trailer}
      loop
      muted
      playing
      width={"100vw"}
      height={"80vh"}
      style={{
        backgroundSize: "contain",
        filter: "brightness(.7)",
        transform: "scale(1.35)",
        backgroundColor: "black",
      }}
    />
  );
};

export default VideoPlayer;
