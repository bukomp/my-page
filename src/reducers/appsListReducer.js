import { createSlice } from '@reduxjs/toolkit';
import MidiPlayer from '../components/Terminal/apps/MidiPlayer/MidiPlayer';

const initialState = [];

const appsListSlice = createSlice({
  name: 'listOfAppsOpen',
  initialState,
  reducers: {
    addToAppsList: (state, action) => {
      return [...state, action.payload];
    },
    removeFromAppsList: (state, action) => {
      return state.filter((app) => app.appName !== action.payload);
    },
    clearAppsList: (state, action) => {
      return [];
    },
    setInitialState: (state, action) => {
      return [
        {
          appName: 'Midi Player',
          component: <MidiPlayer key={'Midi Player'} />,
        },
      ];
    },
  },
});

export const {
  addToAppsList,
  removeFromAppsList,
  clearAppsList,
  setInitialState,
} = appsListSlice.actions;
export default appsListSlice.reducer;
