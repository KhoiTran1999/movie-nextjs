"use client"

import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const initialState: any = {
  value: false,
};

const IsLoadingFeatureSlice  = createSlice({
    name: "isLoadingFeature",
    initialState,
    reducers: {
    setIsLoadingFeature: (state, actions) => {
      state.value = actions.payload;
    },
  },
})

export const { setIsLoadingFeature } = IsLoadingFeatureSlice.actions;
export default IsLoadingFeatureSlice .reducer;