"use server"

import { MovieType } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

export const deleteMovieAction = async(movieId: string):Promise<boolean>=>{
    try {
        await fetch(`${process.env.API_URL}/Movie/${movieId}`, {method: "DELETE"});
        revalidatePath("admin/manageMovies");
        return true;
    } catch (error) {
        return false
    }
}

export const restoreMovieAction = async(movieId: string):Promise<boolean>=>{
    try {
        await fetch(`${process.env.API_URL}/Movie/${movieId}?status=Revert`,{method: "PATCH"});
        revalidatePath("admin/trash");
        return true;
    } catch (error) {
        return false
    }
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

export const revalidateTagMovieListAction = async() => {
    revalidateTag("movie-list")
}
export const revalidatePathTrashAction = async() => {
    revalidatePath("admin/Trash");
}

export const getRecommendedMovieListAction = async(movieId: string, page?: number)=> {
    
    try {
        const res = await fetch(
      `${process.env.API_URL}/Movies?filterBy=recommend&key=${movieId}&page=${page}&eachPage=10`,
      {
        next: { revalidate: 3600 },
      },
    );
    const data = await res.json();
    
      return data;
    } catch (error) {
        throw Error("Failed to fetch get Season")
    }
}
