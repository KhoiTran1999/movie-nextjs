import { LazyLoadImage } from "react-lazy-load-image-component";

interface actorProps {
  characterName: string;
  thumbnail: string;
  namePerson: number;
  personId: string;
}

type castCharacteries = {
  castCharacteries: [];
};

export const Actor = ({ castCharacteries }: castCharacteries) => {
  console.log(castCharacteries);

  return (
    <div className="flex justify-start items-center flex-wrap">
      {castCharacteries.map((val: actorProps) => (
        <div className="w-[18%] h-[150px] mr-2 mb-2" key={val.personId}>
          <LazyLoadImage
            alt="Actors"
            src={val.thumbnail}
            effect="opacity"
            placeholderSrc="/blurImage.jpg"
            className="h-[150px] w-full object-cover rounded-md"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/errorThumbnail.png";
            }}
          />
          <span>{val.namePerson}</span>
        </div>
      ))}
    </div>
  );
};
