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
};

const CardMovie = (props: movieProps) => {
  const {
    movieId,
    time,
    vietnamName,
    englishName,
    thumbnail,
    totalSeasons,
    totalEpisodes,
  } = props;

  const slug = useMemo(() => {
    return slugify(`${englishName}-${vietnamName}`, {
      lower: true,
      locale: "vi",
      strict: true,
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/detail/${slug}.html?id=${movieId}`} className="group/card">
        <div
          className={`relative m-3 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md`}
        >
          <div className="relative aspect-[60/100] w-full max-w-[200px]">
            <Image
              src={thumbnail}
              alt="Thumbnail"
              fill
              priority
              className="rounded object-cover"
              quality={100}
              sizes="(min-width: 1024px) , (min-width: 625px) 30vw, 40vw"
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

export default CardMovie;
