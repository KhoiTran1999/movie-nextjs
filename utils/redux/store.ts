"use client"

import { configureStore } from '@reduxjs/toolkit';
import IsToggleSiderSliceReducer from "@/utils/redux/slices/toggle/IsToggleSiderSlice"
import statisticSliceReducer from "@/utils/redux/slices/data/statisticSlice"
import movieListSliceReducer from "@/utils/redux/slices/data/movieListSlice"
import movieIdSliceReducer from "@/utils/redux/slices/data/movieIdSlice"
import IsLoadingAIButtonReducer from "@/utils/redux/slices/toggle/IsLoadingAIButtonSlice"
import isCancelButtonModalReducer from "@/utils/redux/slices/toggle/IsCancelButtonModalSlice"
import personListReducer from "@/utils/redux/slices/data/personListSlice"

export const store = configureStore({
  reducer: {
    isToggleSider: IsToggleSiderSliceReducer,
    statistics: statisticSliceReducer,
    movieList: movieListSliceReducer,
    movieId: movieIdSliceReducer,
    isLoadingAIButton: IsLoadingAIButtonReducer,
    isCancelButtonModal: isCancelButtonModalReducer,
    personList: personListReducer
  },
});