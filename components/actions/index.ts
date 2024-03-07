"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const deleteMovieAction = async (movieId: string): Promise<boolean> => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Movie/${movieId}`, {
      method: "DELETE",
    });
    revalidatePath("admin/manageMovies");
    return true;
  } catch (error) {
    return false;
  }
};

export const restoreMovieAction = async (movieId: string): Promise<boolean> => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Movie/${movieId}?status=Revert`,
      {
        method: "PATCH",
      },
    );
    revalidatePath("admin/trash");
    return true;
  } catch (error) {
    return false;
  }
};

export const getSeasonListAction = async (
  movieId: string,
  seasonNumber?: number,
  isRevalidate?: boolean,
) => {
  try {
    if (isRevalidate) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Seasons?movieId=${movieId}${seasonNumber ? `&seasonNumber=${seasonNumber}` : ""}`,
        { next: { revalidate: 259200 } },
      );
      return await res.json();
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Seasons?movieId=${movieId}${seasonNumber ? `&seasonNumber=${seasonNumber}` : ""}`,
      { cache: "no-cache" },
    );
    return await res.json();
  } catch (error) {
    throw Error("Failed to fetch get Season");
  }
};

export const revalidatePathAction = async (path: string, type?: "page") => {
  revalidatePath(path, type);
};

export const revalidateTagAction = async (tag: string) => {
  revalidateTag(tag);
};

export const getRecommendedMovieListAction = async (movieId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=recommend&key=${movieId}&page=1&eachPage=10`,
      {
        next: { revalidate: 259200 },
      },
    );
    const data = await res.json();

    return data;
  } catch (error) {
    throw Error("Failed to fetch get Recommended Movie List");
  }
};

export const getLoadMoreNewMovieListAction = async (next: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Movies?sortBy=produceddate&page=${next}&eachPage=10`,
      {
        next: { revalidate: 259200 },
      },
    );
    const data = await res.json();

    return data;
  } catch (error) {
    throw Error("Failed to fetch get Load More NewMovie List");
  }
};

export const getLoadMoreFeatureMovieListAction = async (
  featureId: string,
  next: number,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Movies?filterBy=feature&key=${featureId}&status=All&sortBy=produceddate&page=${next}&eachPage=10`,
      {
        next: { revalidate: 259200 },
      },
    );
    const data = await res.json();

    return data;
  } catch (error) {
    throw Error("Failed to fetch get Load More Feature Movie List");
  }
};

export const getSearchMovieListAction = async (text: string, next?: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}Movies?key=${encodeURIComponent(text)}&page=${next ? next : 1}&eachPage=10`,
      {
        next: { revalidate: 259200 },
      },
    );

    const totalItems = Number(res.headers.get("x-total-element"));
    const data = await res.json();

    return { data, totalItems };
  } catch (error) {
    throw Error("Failed to fetch get Search Movie List");
  }
};

export const addViewerMovieAction = async (movieId: string) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}Analyst/AddViewerMovie?movieId=${movieId}`,
      {
        cache: "no-store",
      },
    );

    return true;
  } catch (error) {
    throw Error("Failed to fetch add viewer movie action");
  }
};
