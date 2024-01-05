"use client"

import { configureStore } from '@reduxjs/toolkit';
import IsToggleSiderSliceReducer from "@/utils/redux/slices/toggle/IsToggleSiderSlice"
import statisticSliceReducer from "@/utils/redux/slices/data/statisticSlice"

export const store = configureStore({
  reducer: {
    isToggleSider: IsToggleSiderSliceReducer,
    statistics: statisticSliceReducer,
  },
});