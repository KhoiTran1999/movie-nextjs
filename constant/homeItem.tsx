import type { MenuProps } from "antd";
import Link from "next/link";

interface homeItemProps {
  href: string;
  name: string;
}

export const homeItems: homeItemProps[] = [
  {
    href: "/?page=Home",
    name: "Home",
  },
  {
    href: "/NewMovie?page=NewMovie",
    name: "New Movie",
  },
  {
    href: "/CinemaFilm?page=CinemaFilm",
    name: "Cinema Film",
  },

  {
    href: "/StandaloneFilm?page=StandaloneFilm",
    name: "Standalone Film",
  },
  {
    href: "/TVSeries?page=TVSeries",
    name: "TV Series",
  },
];
