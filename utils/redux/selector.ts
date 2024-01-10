"use client"

const isToggleSiderSelector = (state:any) => state.isToggleSider.value;
const statisticSelector = (state:any) => state.statistics.value;
const movieListSelector = (state:any) => state.movieList.value;

export {isToggleSiderSelector, statisticSelector, movieListSelector}