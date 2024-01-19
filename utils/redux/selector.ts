"use client"

const isToggleSiderSelector = (state:any) => state.isToggleSider.value;
const statisticSelector = (state:any) => state.statistics.value;
const movieListSelector = (state:any) => state.movieList.value;
const movieIdSelector = (state:any) => state.movieId.value;
const isLoadingAIButtonSelector = (state:any) => state.isLoadingAIButton.value;
const isCancelButtonModalSelector = (state:any) => state.isCancelButtonModal.value;
const personListSelector = (state:any) => state.personList.value;

export {isToggleSiderSelector, statisticSelector, movieListSelector, movieIdSelector, isLoadingAIButtonSelector, isCancelButtonModalSelector, personListSelector}