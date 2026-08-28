import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/roboto-condensed/wght.css'
import '@fontsource-variable/roboto-condensed/wght-italic.css'
import '@fontsource-variable/noto-sans-tc/wght.css'
import App from './App.tsx'
import './styles/globals.css'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
