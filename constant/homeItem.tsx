import type { MenuProps } from "antd";
import Link from "next/link";

interface homeItemProps {
  href: string;
  name: string;
  code: string;
}

export const homeItems: homeItemProps[] = [
  {
    href: "/?current=Home",
    name: "Home",
    code: "Home",
  },
  {
    href: "/feature?current=NewMovie",
    name: "New Movie",
    code: "NewMovie",
  },
  {
    href: "/feature?current=CinemaFilm&featureId=1",
    name: "Cinema Film",
    code: "CinemaFilm",
  },

  {
    href: "/feature?current=StandaloneFilm&featureId=2",
    name: "Standalone Film",
    code: "StandaloneFilm",
  },
  {
    href: "/feature?current=TVSeries&featureId=3",
    name: "TV Series",
    code: "TVSeries",
  },
];
