import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './MyProject_1/App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
  <App />
  </BrowserRouter>

)
