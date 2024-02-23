"use server";

import CardSliderTop10 from "./CardSliderTop10";

const CardSliderTop10Data = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Analyst/GetViewerMovie`,
    { next: { revalidate: 900 } },
  );
  const top10 = await res.json();

  return (
    <CardSliderTop10
      title="Top 10"
      movieList={top10}
      icon={
        <i className="fa-sharp fa-regular fa-arrow-down-wide-short mr-2 text-[red] sm:text-2xl"></i>
      }
    />
  );
};

export default CardSliderTop10Data;
