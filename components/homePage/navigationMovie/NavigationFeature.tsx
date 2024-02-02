import { homeItems } from "@/constant/homeItem";
import Link from "next/link";

interface homeItemProps {
  href: string;
  name: string;
  code: string;
}

const NavigationFeature = (props: any) => {
  const page = props?.searchParams?.current ?? "Home";

  return (
    <ul className="flex items-center justify-center">
      {homeItems?.map((val: homeItemProps, idx: number) => (
        <li
          key={idx}
          className={` mr-4 border-b-2 border-transparent font-semibold transition-colors hover:border-b-[#ffffff8c] ${val.code === page && "border-b-red-600"}`}
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
