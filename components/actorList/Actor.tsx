export const Actor = () => {
  return (
    <div className="flex justify-start items-center flex-wrap">
      {Array.from({ length: 5 }, (_, idx) => (
        <div className="w-[18%] mr-2 mb-2">
          <img
            src="https://preview.redd.it/back-to-the-future-4-your-kids-are-gonna-love-it-v0-dogbil1y6f3b1.png?width=640&crop=smart&auto=webp&s=aa39e695f73610a3f80edec9a3a21e2bce2542bb"
            alt=""
            className="object-contain w-full"
          />
          <span>Chris Hemsworth asdfasdf asdfas dfasdf as</span>
        </div>
      ))}
    </div>
  );
};
