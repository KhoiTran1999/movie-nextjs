import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import SearchMovie from "@/components/searchPage/SearchMovie";
import { MovieType } from "@/types";

const Search = async (props: any) => {
  const text = props?.searchParams?.text || "";
  const page = props?.searchParams?.page || 1;

  let totalPage: number = 1;
  let movieSearch: MovieType[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Movies?key=${text}&page=${page}&eachPage=10`,
      {
        next: { revalidate: 86400 },
      },
    );
    totalPage = Number(res.headers.get("x-total-page"));
    movieSearch = await res.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <NavigationMovie />
      <SearchMovie
        movieSearch={text ? movieSearch : []}
        page={Number(page)}
        totalPage={totalPage}
        text={text}
      />
    </div>
  );
};

export default Search;
