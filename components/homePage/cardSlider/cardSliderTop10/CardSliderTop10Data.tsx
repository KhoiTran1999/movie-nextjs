"use server";

import CardSliderTop10 from "./CardSliderTop10";
import { unstable_noStore as noStore } from "next/cache";

const CardSliderTop10Data = async () => {
  noStore();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Analyst/GetViewerMovie`,
    { next: { revalidate: 900 } },
  );
  const top10 = await res.json();

  return (
    <>
      {top10.length > 3 ? (
        <CardSliderTop10
          title={`Top ${top10.length} Movies This Week`}
          movieList={top10}
          icon={
            <i className="fa-sharp fa-regular fa-arrow-down-wide-short mr-2 text-[red] sm:text-2xl"></i>
          }
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CardSliderTop10Data;
