import { revalidatePath } from "next/cache";
import Trash from "../../../components/adminPage/content/Trash/Trash";
import { CategoryType, MovieAntdTableType, MovieType } from "@/types";
import { SuspenseComp } from "@/components/wrapper/SuspenseComp";

export default async function page(props: any) {
  const LIMIT = 5;
  const page = props?.searchParams?.page ?? 1;

  const filterData = (arr: MovieType[]): MovieAntdTableType[] => {
    const filteredData = arr.map((val: MovieType) => {
      const feature = val.feature?.name;
      const categories =
        val.categories?.map((cat: CategoryType) => cat.name) ?? [];
      const newObj = {
        movieId: val.movieId,
        thumbnail: val.thumbnail,
        englishName: val.englishName,
        time: val.time,
        mark: val.mark,
        status: val.status,
        feature,
        categories,
        dateCreated: val.dateCreated,
        deletedButton: val.movieId,
      };
      return newObj;
    });
    return filteredData;
  };

  revalidatePath("admin/Trash");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}Movies?filterBy=deleted&page=${page}&eachPage=${LIMIT}&sortBy=DeletedDate`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();

  const totalItems = Number(res.headers.get("x-total-element"));
  return (
    <SuspenseComp>
      <Trash
        movieList={filterData(data)}
        meta={{ current: page, pageSize: LIMIT, total: totalItems }}
      />
    </SuspenseComp>
  );
}
