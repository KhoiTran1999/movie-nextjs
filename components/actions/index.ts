"use server"

import { revalidateTag } from "next/cache";

export const handleCreateMovieAction = async (formData: FormData) => {
    const file = formData.get('Thumbnail') as File;
    console.log(file);
}

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