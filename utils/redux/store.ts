"use client"

import { configureStore } from '@reduxjs/toolkit';
import isHoverCardSliderReducer from "@/utils/redux/slices/toggle/IsHoverCardSliderSlice"

export const store = configureStore({
  reducer: {
    isHoverCardSlider: isHoverCardSliderReducer
  },
});