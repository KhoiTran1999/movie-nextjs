"use client";

import { revalidatePathAction } from "@/components/actions";
import { homeItems } from "@/constant/homeItem";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface homeItemProps {
  href: string;
  name: string;
  code: string;
}

const NavigationFeature = (props: any) => {
  const searchParams = useSearchParams();

  const page = searchParams.get("current") ?? "Home";

  const handleChangeRoute = async () => {
    await revalidatePathAction("feature");
  };

  return (
    <ul className="flex items-center justify-center">
      {homeItems?.map((val: homeItemProps, idx: number) => {
        return (
          <Link href={val.href}>
            <li
              onClick={handleChangeRoute}
              key={idx}
              className={` mr-4 border-b-2 border-transparent font-semibold transition-colors hover:border-b-[#ffffff8c] ${val.code === page && "border-b-red-600"}`}
            >
              {val.name}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default NavigationFeature;
