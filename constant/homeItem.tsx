import type { MenuProps } from "antd";
import Link from "next/link";

export const homeItems: MenuProps["items"] = [
  {
    key: "/",
    label: (
      <div>
        <Link href="/">Home</Link>
      </div>
    ),
  },
  {
    key: "/CinemaFilm",
    label: (
      <div>
        <Link href="/CinemaFilm">Cinema Film</Link>
      </div>
    ),
  },
  {
    key: "/NewMovie",
    label: (
      <div>
        <Link href="/NewMovie">New Movie</Link>
      </div>
    ),
  },
  {
    key: "/StandaloneFilm",
    label: (
      <div>
        <Link href="/StandaloneFilm">Standalone Film</Link>
      </div>
    ),
  },
  {
    key: "/TVSeries",
    label: (
      <div>
        <Link href="/TVSeries">TV Series</Link>
      </div>
    ),
  },
];
