"use client"

import { configureStore } from '@reduxjs/toolkit';
import IsToggleSiderSliceReducer from "@/utils/redux/slices/toggle/IsToggleSiderSlice"
import statisticSliceReducer from "@/utils/redux/slices/data/statisticSlice"
import movieListSliceReducer from "@/utils/redux/slices/data/movieListSlice"

export const store = configureStore({
  reducer: {
    isToggleSider: IsToggleSiderSliceReducer,
    statistics: statisticSliceReducer,
    movieList: movieListSliceReducer
  },
});