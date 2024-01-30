"use server";

import { homeItems } from "@/constant/homeItem";
import Link from "next/link";

interface homeItemProps {
  href: string;
  name: string;
}

const NavigationFeature = (props: any) => {
  const page = props?.searchParams?.page ?? "Home";

  return (
    <ul className="flex items-center justify-center">
      {homeItems?.map((val: homeItemProps, idx: number) => (
        <li
          key={idx}
          className={`${val.name === page && "border-b-2 border-b-red-600"} mr-4 font-semibold`}
        >
          <div>
            <Link href={val.href}>{val.name}</Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NavigationFeature;
