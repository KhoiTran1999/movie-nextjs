"use server"

import { revalidatePath, revalidateTag } from "next/cache";

export const deleteMovieAction = async(movieId: string)=>{
    try {
        await fetch(`${process.env.API_URL}/Movie/${movieId}`, {method: "DELETE"});
        revalidateTag("movie-list");
        return true;
    } catch (error) {
        return false
    }
}

export const revalidateTagMovieListAction = async()=>{
    revalidateTag("movie-list");
}

export const getSeasonListAction = async(movieId: string, seasonNumber?: number)=>{
    try {
        revalidatePath("admin/manageMovies");
        const res = await fetch(
        `${process.env.API_URL}/Seasons?movieId=${movieId}${seasonNumber?`&seasonNumber=${seasonNumber}`:""}`, {next: {tags: ["season-list"]}}
      );
      return await res.json();
    } catch (error) {
        throw Error("Failed to fetch get Season")
    }
}

export const revalidateTagSeasonListAction = async()=>{
    revalidateTag("season-list");
}
