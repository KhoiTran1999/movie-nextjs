export default async function Feture(props: any) {
  const current = props?.searchParams?.current;

  let movieList;
  if (current === "NewMovie") {
    try {
      const res = await fetch(
        `${process.env.API_URL}/Movies?sortBy=producedday}`,
        {
          cache: "no-store",
        },
      );
      movieList = await res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch New Movie List!");
    }
  } else if (typeof current === "number") {
    try {
      const res = await fetch(
        `${process.env.API_URL}/Movies?filterBy=feature&key=${current}&status=All&sortBy=producedday&page=1&eachPage=20}`,
        {
          cache: "no-store",
        },
      );
      movieList = await res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch Feature Movie List!");
    }
  }

  return <div>Hello</div>;
}
