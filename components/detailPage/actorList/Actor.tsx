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
          <img
            src={val.thumbnail}
            alt="avatar actors"
            className="object-cover w-full h-full rounded"
          />
          <span>{val.namePerson}</span>
        </div>
      ))}
    </div>
  );
};
