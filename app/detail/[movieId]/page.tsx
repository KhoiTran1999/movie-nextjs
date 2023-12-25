"use client";

import NavigationMovie from "@/components/navigationMovie/NavigationMovie";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Rubik_Dirt } from "@next/font/google";
import {
  CaretRightFilled,
  StarFilled,
  PlusOutlined,
  LikeOutlined,
  ShareAltOutlined,
  FireFilled,
} from "@ant-design/icons";
import Image from "next/image";
import { Tabs, Tooltip } from "antd";
import type { TabsProps } from "antd";
import { Actor } from "@/components/actorList/Actor";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export default function Detail() {
  const items: TabsProps["items"] = [
    {
      key: "Description",
      label: "Description",
      children: `In "Back to the Future 4" Tom Holland takes on the role of a
            brilliant young inventor, Jake McFly, who stumbles upon Doc Brown's
            long-lost journal. The journal contains secrets to enhance time
            travel capabilities, opening up new possibilities and unforeseen
            consequences. As Jake navigates through various timelines, he
            encounters both familiar faces and new challenges, all while trying
            to prevent a mysterious adversary from rewriting history.`,
    },
    {
      key: "Actors",
      label: "Actors",
      children: <Actor />,
    },
  ];

  return (
    <div>
      <NavigationMovie />
      <ReactPlayer
        url={"https://www.youtube.com/watch?v=nS12Fbtgr5A"}
        // playing
        controls
        width={"100svw"}
        height={"80svh"}
        style={{ marginTop: "82px" }}
      />
      <div className="flex justify-center items-start my-8">
        <div
          style={{
            boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
          }}
          className="w-1/2 mr-2 text-[#D1D0CF] flex flex-col justify-center"
        >
          <h1
            className={`${rubik.className} text-7xl my-4 tracking-wider [word-spacing:5px] animate-wiggle w-full`}
          >
            BACK TO THE FUTURE 4
          </h1>
          <h2>Trở về tương lai 4</h2>
          <div className="my-4">
            <span>2023</span>
            <span className="mx-4">1h20m</span>
            <span>
              4.3/5 <StarFilled className="text-yellow-400" />
            </span>
            <ul className="mt-2 flex items-center flex-wrap">
              {Array.from({ length: 5 }, (_, idx) => {
                if (idx + 1 < 5) {
                  return (
                    <li className="mr-2" key={idx}>
                      <span className="mr-2 hover:text-[#E50914] cursor-pointer">
                        Lý thú
                      </span>
                      <FireFilled className="text-xs text-[#E50914]" />
                    </li>
                  );
                }
                return (
                  <li className="mr-2" key={idx}>
                    <span className=" hover:text-[#E50914] cursor-pointer">
                      Hành động
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <Tabs type="card" defaultActiveKey="Description" items={items} />
          <div className="mt-5 flex">
            <button className="w-44 px-6 py-3 mr-8 bg-[#E50914] hover:bg-red-800 rounded text-sm font-semibold text-white transition-colors flex justify-center items-center">
              <CaretRightFilled className="text-xl" />
              <span>Play Now</span>
            </button>
            <Tooltip color="grey" title="Add watch list">
              <span
                className={`transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 w-11 h-11 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
              >
                <PlusOutlined className="text-xl" />
              </span>
            </Tooltip>

            <Tooltip color="grey" title="Like">
              <span
                className={`mx-3 transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 w-11 h-11 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
              >
                <LikeOutlined className="text-xl" />
              </span>
            </Tooltip>

            <Tooltip color="grey" title="Share">
              <span
                className={`transition-all hover:scale-110 hover:bg-gray-700/60 bg-gray-700/90 w-11 h-11 p-3 rounded-full  flex justify-center items-center cursor-pointer`}
              >
                <ShareAltOutlined className="text-xl" />
              </span>
            </Tooltip>
          </div>
        </div>
        <img
          src="https://preview.redd.it/back-to-the-future-4-your-kids-are-gonna-love-it-v0-dogbil1y6f3b1.png?width=640&crop=smart&auto=webp&s=aa39e695f73610a3f80edec9a3a21e2bce2542bb"
          alt="thumbnail"
          style={{ borderRadius: "10px" }}
          className="w-[30%]"
        />
      </div>
    </div>
  );
}
