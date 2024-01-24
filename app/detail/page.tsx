import MainDetailPage from "@/components/detailPage/MainDetailPage";

export default async function Detail(props: any) {
  const movieId = props?.searchParams?.id ?? "";

  let data;
  try {
    const res = await fetch(`${process.env.API_URL}/Movie/${movieId}`);
    data = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Movie Detail!");
  }

  return <MainDetailPage {...data} />;
}
