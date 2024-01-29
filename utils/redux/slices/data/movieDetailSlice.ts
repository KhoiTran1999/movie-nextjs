"use client"

import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const initialState: any = {
  value: null,
};

const movieDetailSlice = createSlice({
    name: "movieDetail",
    initialState,
    reducers: {
    setmovieDetail: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { setmovieDetail } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;