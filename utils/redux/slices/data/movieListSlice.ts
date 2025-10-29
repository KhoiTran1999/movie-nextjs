'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  value: [],
};

const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    setmovieList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setmovieList } = movieListSlice.actions;
export default movieListSlice.reducer;
