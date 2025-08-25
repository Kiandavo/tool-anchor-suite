
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'

console.log('Main entry point loading...');

// Ensure root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  throw new Error('Root element not found');
}

console.log('Root element found, creating React root...');

try {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Failed to render React app:', error);
  
  // Secure fallback rendering without innerHTML
  const fallbackContainer = document.createElement('div');
  fallbackContainer.style.cssText = 'display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;';
  
  const contentDiv = document.createElement('div');
  contentDiv.style.cssText = 'text-align: center; padding: 2rem;';
  
  const title = document.createElement('h1');
  title.style.cssText = 'color: #dc2626; margin-bottom: 1rem;';
  title.textContent = 'خطا در بارگذاری';
  
  const message = document.createElement('p');
  message.style.cssText = 'color: #374151; margin-bottom: 1rem;';
  message.textContent = 'متأسفانه در بارگذاری صفحه مشکلی پیش آمده است.';
  
  const button = document.createElement('button');
  button.style.cssText = 'background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; cursor: pointer;';
  button.textContent = 'تلاش مجدد';
  button.addEventListener('click', () => window.location.reload());
  
  contentDiv.appendChild(title);
  contentDiv.appendChild(message);
  contentDiv.appendChild(button);
  fallbackContainer.appendChild(contentDiv);
  
  rootElement.appendChild(fallbackContainer);
}
