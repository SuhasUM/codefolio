import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './eventzee.css'

if (window.location.hostname === 'eventzee.in') {
  const targetUrl = `https://www.eventzee.in${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.location.replace(targetUrl);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
