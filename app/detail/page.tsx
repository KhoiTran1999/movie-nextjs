import MainDetailPage from "@/components/detailPage/MainDetailPage";
import Axios from "@/utils/axios";

export default async function Detail(props: any) {
  const movieId = props?.searchParams?.id ?? "";

  let data;
  try {
    const res = await Axios(`Movie/${movieId}`);
    data = res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Movie Detail!");
  }

  return <MainDetailPage {...data} />;
}
