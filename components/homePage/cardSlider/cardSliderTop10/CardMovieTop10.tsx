"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import slugify from "slugify";
import { motion } from "framer-motion";

type movieProps = {
  movieId: string;
  mark?: number;
  time: number;
  vietnamName: string;
  englishName: string;
  thumbnail: string;
  totalSeasons: number;
  totalEpisodes: number;
  dateCreated?: string;
  idx: number;
};

const CardMovieTop10 = (props: movieProps) => {
  const {
    movieId,
    time,
    vietnamName,
    englishName,
    thumbnail,
    totalSeasons,
    totalEpisodes,
    idx,
  } = props;

  const [imageState, setImageState] = useState<string>(thumbnail);

  const slug = useMemo(() => {
    return slugify(`${englishName}-${vietnamName}`, {
      lower: true,
      locale: "vi",
      strict: true,
    });
  }, []);

  useEffect(() => {
    setImageState(thumbnail);
  }, [thumbnail]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/detail/${slug}.html?id=${movieId}`}
        className="group/card flex p-3"
      >
        <div className="mr-[-7px] w-[50%] sm:mr-[-10px]">
          <div className="relative aspect-[60/100] w-full">
            <Image
              src={`/top10/number${idx + 1}.png`}
              alt="Number"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div
          className={`relative w-[50%] cursor-pointer overflow-hidden rounded-md`}
        >
          <div className="aspect-[60/100] w-full">
            <Image
              src={imageState}
              alt="Thumbnail"
              fill
              priority
              className="rounded object-cover"
              quality={100}
              sizes="(min-width: 1024px) 100vw, (min-width: 625px) 30vw, 40vw"
              onError={(e) => {
                setImageState("/errorThumbnail.jpg");
              }}
            />
          </div>

          <div className="absolute bottom-[-200px] z-50 hidden w-full bg-[#0000009b] p-2 pb-3 backdrop-blur-sm transition-all duration-300 group-hover/card:bottom-0 md:block">
            <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left text-base font-bold tracking-wide text-white">
              {englishName}
            </h3>
            <h4 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left text-sm text-gray-200">
              {vietnamName}
            </h4>
            <span className="text-sm text-gray-200">
              {totalSeasons > 1
                ? `${totalSeasons} Seasons`
                : totalEpisodes > 1
                  ? `${totalEpisodes} Episodes`
                  : `${time} minutes`}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CardMovieTop10;
