"use client"

import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const initialState: any = {
  value: false,
};

const IsHoverCardSliderSlice = createSlice({
    name: "isHoverCardSlider",
    initialState,
    reducers: {
    toggleIsHoverCardSlider: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { toggleIsHoverCardSlider } = IsHoverCardSliderSlice.actions;
export default IsHoverCardSliderSlice.reducer;