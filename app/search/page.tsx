import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";
import SearchMovie from "@/components/searchPage/SearchMovie";
import { MovieType } from "@/types";

const Search = async (props: any) => {
  const text = props?.searchParams?.text || "";
  const page = props?.searchParams?.page || 1;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}Movies?key=${encodeURIComponent(text)}&page=${page}&eachPage=10`,
    {
      next: { revalidate: 86400 },
    },
  );
  const totalPage = Number(res.headers.get("x-total-page"));
  const movieSearch: MovieType[] = await res.json();

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
