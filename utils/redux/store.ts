"use client"

import { configureStore } from '@reduxjs/toolkit';
import IsToggleSiderSliceReducer from "@/utils/redux/slices/toggle/IsToggleSiderSlice"

export const store = configureStore({
  reducer: {
    isToggleSider: IsToggleSiderSliceReducer,
  },
});