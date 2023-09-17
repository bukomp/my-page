import { configureStore } from '@reduxjs/toolkit';

import commandReducer from '../reducers/commandReducer';
import outputReducer from '../reducers/outputReducer';

const reducer = {
  commandHistory: commandReducer,
  outputHistory: outputReducer,
};

const store = configureStore({ reducer });

//anecdotesService
//  .getAll()
//  .then((anecdotes) => store.dispatch(initializeAnecdotes(anecdotes)));

export default store;
