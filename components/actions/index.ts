"use server"

export const handleCreateMovieAction = async (formData: FormData) => {
    const file = formData.get('Thumbnail') as File;
    console.log(file);
    
}