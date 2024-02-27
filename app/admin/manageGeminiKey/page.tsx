import ManageGeminiKey from "@/components/adminPage/content/ManageGeminiKey/ManageGeminiKey";
import { SuspenseComp } from "@/components/wrapper/SuspenseComp";
import { unstable_noStore as noStore } from "next/cache";

export default async function page(props: any) {
  noStore();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/GetGeminiKey`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <SuspenseComp>
      <ManageGeminiKey geminiKeyList={data.reverse()} />
    </SuspenseComp>
  );
}
