import Dashboard from "@/components/adminPage/content/Dashboard";

interface StatisticType {
  upcoming: number;
  pending: number;
  release: number;
  deleted: number;
  account: number;
}

export default async function page() {
  let data: StatisticType;
  try {
    const res = await fetch(`${process.env.API_URL}/Admin/Statistics`, {
      cache: "no-store",
    });
    data = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Statistics");
  }

  return (
    <Dashboard
      upcoming={data.upcoming}
      pending={data.pending}
      release={data.release}
      deleted={data.deleted}
      account={data.account}
    />
  );
}
