import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const outputSlice = createSlice({
  name: 'outputHistory',
  initialState,
  reducers: {
    saveToOutputHistory: (state, action) => {
      return [...state, action.payload];
    },
    clearOutputHistory: (state, action) => {
      return [];
    },
  },
});

export const { saveToOutputHistory, clearOutputHistory } = outputSlice.actions;
export default outputSlice.reducer;
