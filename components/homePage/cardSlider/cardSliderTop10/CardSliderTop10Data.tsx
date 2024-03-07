"use server";

import CardSliderTop10 from "../cardSliderTop10/CardSliderTop10";

import { Top } from "@/public/top";

const CardSliderTop10Data = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Analyst/GetViewerMovie`,
    { next: { revalidate: 259200 } },
  );
  let top10 = await res.json();

  if (top10.length < 3) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=feature&key=3&sortBy=produceddate&page=1&eachPage=10`,
      { next: { revalidate: 259200 } },
    );
    top10 = await res.json();
  }

  return (
    <>
      {top10.length > 3 ? (
        <CardSliderTop10
          title={`Top ${top10.length} Movies This Week`}
          movieList={top10}
          icon={<Top width={24} height={24} className="mr-2" />}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CardSliderTop10Data;
