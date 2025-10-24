import React from 'react'
import { createRoot } from 'react-dom/client'
import MyAwesomeApp from './MyApp'
import './styles.css'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
  <MyAwesomeApp />
  </React.StrictMode>
)
