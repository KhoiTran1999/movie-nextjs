'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  value: false,
};

const IsToggleSiderSlice = createSlice({
  name: 'isToggleSider',
  initialState,
  reducers: {
    toggleSider: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleSider } = IsToggleSiderSlice.actions;
export default IsToggleSiderSlice.reducer;
