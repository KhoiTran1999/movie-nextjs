import Dashboard from "@/components/adminPage/content/Dashboard";

interface StatisticType {
  upcoming: number;
  pending: number;
  released: number;
  deleted: number;
  account: number;
}

interface FeatureDataType{
  cinema: number;
  standalone: number;
  tvSeries: number;
}

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

  let featuresData: FeatureDataType;
  try {
    const res = await fetch(`${process.env.API_URL}/Admin/Features`, {
      cache: "no-store",
    });
    featuresData = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Statistics");
  }

  return (
    <Dashboard
    statisticsData={statisticsData}
    featuresData={featuresData}
    />
  );
}
