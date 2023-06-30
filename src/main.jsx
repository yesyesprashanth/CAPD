import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {TestContextProvider} from './store/testContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestContextProvider>
        <App />
    </TestContextProvider>
  </React.StrictMode>,
)
