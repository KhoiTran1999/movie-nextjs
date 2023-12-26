"use client";

import { useEffect, useRef } from "react";

type movieProps = {
  seasonNumber: number;
  episodeNumber: number;
  name: string;
  video: string;
};

export const WatchModal = ({
  seasonNumber,
  episodeNumber,
  name,
  video,
}: movieProps) => {
  return (
    <div className="h-[70svh]">
      <iframe
        src={`https://thptanlac-my.sharepoint.com/personal/ttlhmax1193_thptanlac_onmicrosoft_com/_layouts/15/embed.aspx?UniqueId=${video}`}
        width="100%"
        height="100%"
        frameBorder="100"
        allowFullScreen
        title={`${name} - Episode ${episodeNumber} - Season ${seasonNumber}`}
        style={{ borderRadius: "10px" }}
        id="iframeVideo"
      ></iframe>
    </div>
  );
};
