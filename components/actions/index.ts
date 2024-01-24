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
        revalidateTag("newest-movie");
        revalidateTag("slider-movie");
        return true;
    } catch (error) {
        return false
    }
}

export const revalidateTagMovieListAction = async()=>{
    revalidateTag("movie-list");
}

export const revalidateTagNewestMovieAction = async()=>{
    revalidateTag("newest-movie");
}

export const revalidateTagCardSliderListAction = async()=>{
    revalidateTag("slider-movie");
}