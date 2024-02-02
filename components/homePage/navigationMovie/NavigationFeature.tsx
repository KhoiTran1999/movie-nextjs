"use client";

import { revalidatePathAction } from "@/components/actions";
import { homeItems } from "@/constant/homeItem";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
    <Suspense>
      <ul className="flex items-center justify-center">
        {homeItems?.map((val: homeItemProps, idx: number) => {
          return (
            <Link href={val.href} key={idx}>
              <li
                onClick={handleChangeRoute}
                className={` mr-4 border-b-2 border-transparent font-semibold transition-colors hover:border-b-[#ffffff8c] ${val.code === page && "border-b-red-600"}`}
              >
                {val.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </Suspense>
  );
};

export default NavigationFeature;
