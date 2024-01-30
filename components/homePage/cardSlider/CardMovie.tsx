import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CardMovie = ({ ...props }) => {
  const { val } = props;

  return (
    <Link href={`/detail?id=${val.movieId}`} className="group/card">
      <div
        className={`relative m-3 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md`}
      >
        <div>
          <LazyLoadImage
            alt="Thumbnail"
            src={val.thumbnail}
            effect="blur"
            loading="lazy"
            className="h-[140px] rounded-md object-cover max-[768px]:h-[290px]  max-[726px]:h-[250px] max-[622px]:h-[210px] max-[528px]:h-[170px]  max-[440px]:h-[160px] md:h-[330px]"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/errorThumbnail.jpg";
            }}
          />
        </div>

        {screen.width > 727 && (
          <div className="absolute bottom-[-200px] z-50 w-full bg-[#0000009b] p-2 pb-3 backdrop-blur-sm transition-all  duration-300 group-hover/card:bottom-0">
            <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left text-base font-bold tracking-wide text-white">
              {val.englishName}
            </h3>
            <h4 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left text-sm text-gray-200">
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
        )}
      </div>
    </Link>
  );
};

export default CardMovie;
