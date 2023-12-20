"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/streamable";

export default function Hello() {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `https://streamit-movie.azurewebsites.net/Watch/mck`
        );
        if (response.ok) {
          const videoBlob = await response.blob();
          const videoUrl = URL.createObjectURL(videoBlob);
          setVideoUrl(videoUrl);
        } else {
          console.error(
            "Failed to fetch video:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, []);

  return (
    <div>
      <h2>HAHA</h2>
      <Link href={"/"}>Go home</Link>
      <div>
        {videoUrl ? (
          <video controls className="h-screen w-screen bg-contain">
            <source src={videoUrl} type="video/mp4" />{" "}
            {/* Định dạng video tùy thuộc vào loại video bạn lưu trữ */}
          </video>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
      {/* <ReactPlayer
        url={`https://streamit-movie.azurewebsites.net/Watch/mck`}
        loop
        controls
        playing
        width={"100vw"}
        height={"100vh"}
        light={
          "https://7z363nlh6c.execute-api.us-east-1.amazonaws.com/v1/storage-movie-data/4.jpg"
        }
      /> */}
      {/* <video
        controls
        poster="https://7z363nlh6c.execute-api.us-east-1.amazonaws.com/v1/storage-movie-data/4.jpg"
        autoPlay
        className="h-screen w-screen bg-contain"
      >
        <source
          src={`https://streamit-movie.azurewebsites.net/Watch/mck`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video> */}
    </div>
  );
}
