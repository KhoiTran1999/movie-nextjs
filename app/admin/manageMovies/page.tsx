import ManageMovies from "@/components/adminPage/content/ManageMovies";
import { SuspenseComp } from "@/components/wrapper/SuspenseComp";
import { CategoryType, MovieAntdTableType, MovieType } from "@/types";
import { revalidatePath } from "next/cache";

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

  revalidatePath("admin/manageMovies");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Movies?sortBy=createddate&page=${page}&eachPage=${LIMIT}&status=All`,
    { cache: "no-store" },
  );

  const data = await res.json();

  const totalItems = Number(res.headers.get("x-total-element"));

  return (
    <SuspenseComp>
      <ManageMovies
        movieList={filterData(data)}
        meta={{ current: page, pageSize: LIMIT, total: totalItems }}
      />
    </SuspenseComp>
  );
}
