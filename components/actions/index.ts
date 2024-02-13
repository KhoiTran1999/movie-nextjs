"use server"

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
        const res = await fetch(
        `${process.env.API_URL}/Seasons?movieId=${movieId}${seasonNumber?`&seasonNumber=${seasonNumber}`:""}`, {cache: "no-cache"}
      );
      return await res.json();
    } catch (error) {
        throw Error("Failed to fetch get Season")
    }
}

export const revalidatePathAction = async(path: string, type?: "page") => {
    revalidatePath(path, type);
}

export const revalidateTagAction = async(tag:string) => {
    revalidateTag(tag);
}

export const getRecommendedMovieListAction = async(movieId: string, page?: number)=> {
    
    try {
        const res = await fetch(
      `${process.env.API_URL}/Movies?filterBy=recommend&key=${movieId}&page=${page}&eachPage=10`,
      {
       next: { revalidate: 900 },
      },
    );
    const data = await res.json();
    
      return data;
    } catch (error) {
        throw Error("Failed to fetch get Recommended Movie List")
    }
}

export const getLoadMoreNewMovieListAction = async(next: number)=> {
    
    try {
        const res = await fetch(
        `${process.env.API_URL}/Movies?sortBy=produceddate&page=${next}&eachPage=10`, {
       next: { revalidate: 900 },
      },
      );
      const data = await res.json();
    
      return data;
    } catch (error) {
        throw Error("Failed to fetch get Load More NewMovie List")
    }
}

export const getLoadMoreFeatureMovieListAction = async(featureId: string, next: number)=> {
    
    try {
        const res = await fetch(
        `${process.env.API_URL}/Movies?filterBy=feature&key=${featureId}&status=All&sortBy=produceddate&page=${next}&eachPage=10`,  {
       next: { revalidate: 900 },
      },
      );
      const data = await res.json();
    
      return data;
    } catch (error) {
        throw Error("Failed to fetch get Load More Feature Movie List")
    }
}

export const getSearchMovieListAction = async(text: string, next?: number)=> {
    try {
        const res = await fetch(
        `${process.env.API_URL}Movies?key=${encodeURIComponent(text)}&page=${next?next:1}&eachPage=10`,  {
       next: { revalidate: 900 },
      },
      );

      const totalItems = Number(res.headers.get("x-total-element"));
      const data = await res.json();
    
      return {data, totalItems};
    } catch (error) {
        throw Error("Failed to fetch get Search Movie List")
    }
}
