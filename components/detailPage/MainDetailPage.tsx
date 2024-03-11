import { Rubik_Dirt } from "next/font/google";
import { StarFilled, FireFilled } from "@ant-design/icons";
import { Tabs, Tooltip } from "antd";
import { Actor } from "@/components/detailPage/actorList/Actor";
import { MovieDetailType, MovieType } from "@/types";
import Image from "next/image";
import { Plus } from "@/public/plus";
import { Heart } from "@/public/heart";
import { PLayModal } from "./PlayModal";
import { TrailerModal } from "./TrailerModal";
import { CopyUrl } from "./CopyUrl";
import { More } from "./More";

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

interface MainDetailPage {
  movieDetail: MovieDetailType;
  initialRecommendedMovie: MovieType[];
}

export default async function MainDetailPage(props: MainDetailPage) {
  const { movieDetail, initialRecommendedMovie } = props;

  return (
    <div className="animate-opacityAnimated">
      <div>
        <div className={`m-auto w-full max-w-[1200px] px-3 py-8`}>
          <div className="m-auto mt-14 w-full max-w-[700px] text-[#D1D0CF]">
            <div className="flex items-center justify-start">
              <div className="w-fit">
                <h1
                  className={`${rubik.className} my-2 w-full text-2xl tracking-wider [word-spacing:5px] md:my-4 md:text-4xl`}
                >
                  {movieDetail.englishName}
                </h1>
                <h2 className="font-bold">{movieDetail.vietnamName}</h2>
                <div className="my-4">
                  <span>{movieDetail.producedDate.slice(0, 4)}</span>
                  <span className="mx-4">
                    {movieDetail.totalSeasons > 1
                      ? `${movieDetail.totalSeasons} seasons`
                      : movieDetail.totalEpisodes > 1
                        ? `${movieDetail.totalEpisodes} episodes`
                        : `${movieDetail.time} minutes`}
                  </span>
                  <span>
                    {movieDetail.mark}/10{" "}
                    <StarFilled className="text-yellow-400" />
                  </span>
                  <ul className="mt-2 flex flex-wrap items-center">
                    {movieDetail.categories.map(
                      (
                        val: { categoryId: number; name: string },
                        idx: number,
                      ) => {
                        if (idx + 1 < movieDetail.categories.length) {
                          return (
                            <li className="mr-2" key={val.categoryId}>
                              <span className="mr-2 cursor-pointer hover:text-[#E50914]">
                                {val.name}
                              </span>
                              <FireFilled className="text-xs text-[#E50914]" />
                            </li>
                          );
                        }
                        return (
                          <li className="mr-2" key={val.categoryId}>
                            <span className=" cursor-pointer hover:text-[#E50914]">
                              {val.name}
                            </span>
                          </li>
                        );
                      },
                    )}
                  </ul>
                </div>
              </div>
              <div className="relative ml-3 aspect-[60/100] w-[30%]">
                <Image
                  src={movieDetail.thumbnail}
                  alt="Thumbnail"
                  fill
                  priority
                  className="rounded object-cover"
                  quality={100}
                  sizes="(min-width: 1024px) 100vw , (min-width: 625px) 30vw, 40vw"
                />
              </div>
            </div>

            <Tabs
              type="card"
              defaultActiveKey="Description"
              animated
              style={{ height: "fit-content" }}
              items={[
                {
                  key: "Description",
                  label: "Description",
                  children: <More movieDetail={movieDetail} />,
                },
                {
                  key: "Actors",
                  label: "Actors",
                  children: (
                    <Actor castCharacteries={movieDetail.castCharacteries} />
                  ),
                },
              ]}
            />
            <div className="mt-10 flex items-center justify-start">
              <PLayModal movieDetail={movieDetail} />

              <TrailerModal movieDetail={movieDetail} />

              <Tooltip color="#b2afaf2e" title="Add watch list">
                <span
                  className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full  bg-[#b2afaf2e] p-3 transition-colors hover:bg-[#adaaaa64]`}
                >
                  <Plus width={20} height={20} fill="#D1D0CF" />
                </span>
              </Tooltip>

              <Tooltip color="#b2afaf2e" title="Like">
                <span
                  className={`mx-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full  bg-[#b2afaf2e] p-3 transition-colors hover:bg-[#adaaaa64]`}
                >
                  <i className="fa-regular fa-heart text-xl"></i>
                  <Heart width={20} height={20} fill="#D1D0CF" />
                </span>
              </Tooltip>

              <CopyUrl />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
