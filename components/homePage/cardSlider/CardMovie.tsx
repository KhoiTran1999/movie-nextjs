import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CardMovie = ({ ...props }) => {
  const { val } = props;

  return (
    <Link href={`/detail?id=${val.movieId}`}>
      <div
        className={`flex flex-col justify-center items-center relative cursor-pointer overflow-hidden rounded-md`}
      >
        <div>
          <LazyLoadImage
            alt="Thumbnail"
            src={val.thumbnail}
            effect="blur"
            loading="lazy"
            className="h-[330px] rounded-md object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/errorThumbnail.jpg";
            }}
          />
        </div>

        <div className="bg-[#0000009b] backdrop-blur-sm w-full p-2 pb-3 z-50 absolute bottom-[-200px] group-hover/card:bottom-0 transition-all duration-300">
          <h3 className="tracking-wide text-left font-bold text-base whitespace-nowrap overflow-hidden overflow-ellipsis">
            {val.englishName}
          </h3>
          <h4 className="text-left text-gray-200 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
            {val.vietnamName}
          </h4>
          <span className="text-sm text-gray-200">
            {val.totalSeasons > 1
              ? `${val.totalSeasons} Seasons`
              : val.totalEpisodes > 1
              ? `${val.totalEpisodes} Episodes`
              : `${val.time} minutes`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardMovie;
