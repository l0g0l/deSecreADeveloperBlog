import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from './context/Context.js'
import normalize from './normalize.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    
    <ContextProvider>
      <App />
    </ContextProvider>

  </React.StrictMode>,
  document.getElementById('root')
);


