'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  value: false,
};

const IsCancelButtonModalSlice = createSlice({
  name: 'isCancelButtonModal',
  initialState,
  reducers: {
    setIsCancelButtonModal: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setIsCancelButtonModal } = IsCancelButtonModalSlice.actions;
export default IsCancelButtonModalSlice.reducer;
