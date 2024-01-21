import Dashboard from "@/components/adminPage/content/Dashboard";
import Axios from "@/utils/axios";

export default async function page() {
  let data;
  try {
    const res = await Axios("Admin/Statistics");
    data = res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Statistics");
  }

  return <Dashboard {...data} />;
}
