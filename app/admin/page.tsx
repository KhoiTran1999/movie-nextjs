import Dashboard from "@/components/adminPage/content/Dashboard";
import { CategoryType, StatisticType } from "@/types";


export default async function page() {
  let statisticsData: StatisticType;
  try {
    const res = await fetch(`${process.env.API_URL}/Admin/Statistics`, {
      cache: "no-store",
    });
    statisticsData = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Statistics");
  }

  let categoryData: CategoryType;
  try {
    const res = await fetch(`${process.env.API_URL}/Admin/Categories`, {
      cache: "no-store",
    });
    categoryData = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Statistics");
  }

  return (
    <Dashboard
    statisticsData={statisticsData}
    categoryData={categoryData}
    />
  );
}
