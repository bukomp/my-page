import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const commandSlice = createSlice({
  name: 'commandHistory',
  initialState,
  reducers: {
    saveToCommandHistory: (state, action) => {
      localStorage.setItem(
        'commandHistory',
        JSON.stringify([...state, action.payload])
      );
      return [...state, action.payload];
    },
    setInitialCommandHistory: (state, action) => {
      return JSON.parse(localStorage.getItem('commandHistory')) || [];
    },
  },
});

export const { saveToCommandHistory, setInitialCommandHistory } =
  commandSlice.actions;
export default commandSlice.reducer;
