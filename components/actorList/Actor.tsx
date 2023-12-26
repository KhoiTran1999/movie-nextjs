interface actorProps {
  characterName: string;
  image: string;
  namePerson: number;
  personId: string;
}

type castCharacteries = {
  castCharacteries: [];
};

export const Actor = ({ castCharacteries }: castCharacteries) => {
  return (
    <div className="flex justify-start items-center flex-wrap">
      {castCharacteries.map((val: actorProps) => (
        <div className="w-[18%] mr-2 mb-2" key={val.personId}>
          <img
            src={val.image}
            alt=""
            className="object-contain w-full rounded"
          />
          <span>{val.namePerson}</span>
        </div>
      ))}
    </div>
  );
};
