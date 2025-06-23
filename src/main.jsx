import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Buka from './komponen/buka'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Buka />
  </StrictMode>,
)
