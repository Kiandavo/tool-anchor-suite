
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'

console.log('Main.tsx: Starting application initialization...');

// Ensure we only create one root
let root: ReactDOM.Root | null = null;

const initializeApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    // Only create root if it doesn't exist
    if (!root) {
      console.log('Creating React root...');
      root = ReactDOM.createRoot(rootElement);
    }

    console.log('Rendering React app...');
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
    
    console.log('React app rendered successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Fallback error display
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: system-ui;">
          <h1>خطا در بارگذاری</h1>
          <p>متأسفانه خطایی در بارگذاری وب‌سایت رخ داده است.</p>
          <button onclick="window.location.reload()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">تلاش مجدد</button>
        </div>
      `;
    }
  }
};

// Initialize the app
initializeApp();
