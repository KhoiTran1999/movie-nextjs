import MainDetailPage from "@/components/detailPage/MainDetailPage";
import Axios from "@/utils/axios";

export default async function Detail() {
  const res = await Axios("Movie/ca7274ea-0f24-4d20-88a7-d7605c449be9");
  const data = res.data;

  return <MainDetailPage {...data} />;
}
