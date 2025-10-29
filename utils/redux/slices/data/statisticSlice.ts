'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  value: {},
};

const statisticSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setStatistics: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStatistics } = statisticSlice.actions;
export default statisticSlice.reducer;
