import type { MenuProps } from "antd";
import Link from "next/link";

interface homeItemProps {
  href: string;
  name: string;
}

export const homeItems: homeItemProps[] = [
  {
    href: "/?current=Home",
    name: "Home",
  },
  {
    href: "/feture?current=NewMovie",
    name: "New Movie",
  },
  {
    href: "/feture?current=1",
    name: "Cinema Film",
  },

  {
    href: "/feture?current=2",
    name: "Standalone Film",
  },
  {
    href: "/feture?current=3",
    name: "TV Series",
  },
];
