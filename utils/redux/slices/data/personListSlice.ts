"use client"

import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const initialState: any = {
  value: [],
};

const personListSlice = createSlice({
    name: "personList",
    initialState,
    reducers: {
    setPersonList: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { setPersonList } = personListSlice.actions;
export default personListSlice.reducer;