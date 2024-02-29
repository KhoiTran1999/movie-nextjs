"use server";

import CardSliderTop10 from "./CardSliderTop10";
import { unstable_noStore as noStore } from "next/cache";
import { Top } from "@/public/top";

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
          icon={<Top width={24} height={24} className="mr-2" />}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CardSliderTop10Data;
