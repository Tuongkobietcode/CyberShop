import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1 className='text-red-700 text-9xl'>
      Hello đây là trang Admin CyberShop!
    </h1>
  </StrictMode>,
)
