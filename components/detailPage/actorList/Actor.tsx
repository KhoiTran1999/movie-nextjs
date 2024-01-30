import { castCharacteryType } from "@/types";
import { LazyLoadImage } from "react-lazy-load-image-component";

type castCharacteries = {
  castCharacteries: castCharacteryType[];
};

export const Actor = ({ castCharacteries }: castCharacteries) => {
  return (
    <div className="flex flex-wrap items-center justify-start">
      {castCharacteries.length === 0
        ? "Empty Actor"
        : castCharacteries.map((val: castCharacteryType) => (
            <div
              className="mb-2 mr-2 h-[100px] w-[18%] sm:h-[150px]"
              key={val.personId}
            >
              <LazyLoadImage
                alt="Actors"
                src={val.thumbnail}
                effect="blur"
                className="h-full w-full rounded-md object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/errorThumbnail.jpg";
                }}
              />
              <span>{val.namePerson}</span>
            </div>
          ))}
    </div>
  );
};
