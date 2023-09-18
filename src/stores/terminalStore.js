import { configureStore } from '@reduxjs/toolkit';

import commandReducer from '../reducers/commandReducer';
import outputReducer from '../reducers/outputReducer';
import appsListReducer from '../reducers/appsListReducer';

const reducer = {
  commandHistory: commandReducer,
  outputHistory: outputReducer,
  listOfAppsOpen: appsListReducer,
};

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  reducer,
});

export default store;
