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
    <div className="h-[100%]">
      <ReactPlayer
        url={trailer}
        loop
        muted
        // playing
        width={"100%"}
        height={"100%"}
        style={{
          backgroundSize: "contain",
          backgroundPosition: "center center",
          filter: "brightness(.7)",
          // transform: "scale(1.35)",
          backgroundColor: "black",
        }}
      />
    </div>
  );
};

export default VideoPlayer;
