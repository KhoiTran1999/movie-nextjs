'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  value: false,
};

const IsLoadingAIButtonSlice = createSlice({
  name: 'isLoadingAIButton',
  initialState,
  reducers: {
    setIsLoadingAIButton: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLoadingAIButton } = IsLoadingAIButtonSlice.actions;
export default IsLoadingAIButtonSlice.reducer;
