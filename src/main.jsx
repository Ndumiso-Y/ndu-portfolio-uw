import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './index.css'
import './styles/modern.css'
import AppModern from './AppModern.jsx'

// Use HashRouter for GitHub Pages, BrowserRouter for cPanel/Netlify
const target = import.meta.env.VITE_HOST_TARGET || 'gh'
const Router = target === 'gh' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AppModern />
    </Router>
  </React.StrictMode>
)
