import './index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './PayrollForm.jsx'
import './testEngine.js'
import './AccordionSection.jsx'
import './FieldLabel.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)