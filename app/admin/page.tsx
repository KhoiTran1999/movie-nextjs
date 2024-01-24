import Dashboard from "@/components/adminPage/content/Dashboard";

export default async function page() {
  let data;
  try {
    const res = await fetch(`${process.env.API_URL}/Admin/Statistics`);
    data = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Statistics");
  }

  return <Dashboard {...data} />;
}
