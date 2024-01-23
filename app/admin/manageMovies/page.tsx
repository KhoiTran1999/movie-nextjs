import ManageMovies from "@/components/adminPage/content/ManageMovies";
import { CategoryType, MovieAntdTableType, MovieType } from "@/types";
import Axios from "@/utils/axios";

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

  const res = await Axios("/Movies", {
    params: {
      page,
      eachPage: LIMIT,
    },
  });

  const totalItems = res.headers["x-total-element"];

  return (
    <ManageMovies
      movieList={filterData(res.data)}
      meta={{ current: page, pageSize: LIMIT, total: totalItems }}
    />
  );
}
