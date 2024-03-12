"use client";

import { castCharacteryType } from "@/types";
import Image from "next/image";

type castCharacteries = {
  castCharacteries: castCharacteryType[];
};

export const Actor = ({ castCharacteries }: castCharacteries) => {
  return (
    <div className="flex flex-wrap items-start justify-start">
      {castCharacteries.length === 0
        ? "Empty Actor"
        : castCharacteries.map((val: castCharacteryType) => (
            <div className="mb-2 mr-2 w-[18%]" key={val.personId}>
              <div key={val.personId} className="relative aspect-[4/5] w-full">
                <Image
                  src={val.thumbnail}
                  alt="Actors"
                  fill
                  priority
                  className="rounded object-cover"
                  quality={70}
                  sizes="(min-width: 1024px) 100vw , (min-width: 625px) 30vw, 40vw"
                />
              </div>

              <span className="text-[10px]">{val.namePerson}</span>
            </div>
          ))}
    </div>
  );
};
