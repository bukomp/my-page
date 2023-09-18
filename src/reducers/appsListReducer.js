import { createSlice } from '@reduxjs/toolkit';
import AppWindow from '../components/AppWindow/AppWindow';

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
          appName: 'template',
          component: (
            <AppWindow
              key={'template'}
              appName={'template'}
              AppComponent={'This is template APP'}
            />
          ),
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
