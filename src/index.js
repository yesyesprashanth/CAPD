import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {TestContextProvider} from './store/testContextProvider.jsx'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <TestContextProvider>
        <App />
    </TestContextProvider>
  // </React.StrictMode>
);

reportWebVitals();
