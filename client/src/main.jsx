import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Toaster
      position="top-left"
      reverseOrder={true}
      toastOptions={{ duration: 5000 }}
    />
    <App />
  </BrowserRouter>
)
