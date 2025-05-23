import { createRoot } from 'react-dom/client'
import React from 'react';
import './index.css'
import App from './App.jsx'
import GeminiContextProvider from './context/GeminiContext.jsx'

createRoot(document.getElementById('root')).render(
  <GeminiContextProvider>
    <App />
  </GeminiContextProvider>
)
