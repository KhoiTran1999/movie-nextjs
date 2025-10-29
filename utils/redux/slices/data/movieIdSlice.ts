'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  value: '',
};

const movieIdSlice = createSlice({
  name: 'movieId',
  initialState,
  reducers: {
    setMovieId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMovieId } = movieIdSlice.actions;
export default movieIdSlice.reducer;
