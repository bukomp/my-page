import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './stores/terminalStore';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
