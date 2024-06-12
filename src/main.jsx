import React from 'react';
import ReactDOM from 'react-dom/client';
import { DataProvider } from './contexts/index';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
);
