
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'

// Enhanced performance monitoring
if (typeof window !== 'undefined' && 'performance' in window) {
  try {
    // Monitor Core Web Vitals and loading performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('Page Load Time:', entry.duration);
          console.log('DOM Content Loaded:', entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart);
        }
        
        // Monitor Largest Contentful Paint (LCP)
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        
        // Monitor First Input Delay (FID)
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        
        // Monitor Cumulative Layout Shift (CLS)
        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          console.log('CLS:', entry.value);
        }
      }
    });
    
    observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (error) {
    console.log('Performance monitoring not available');
  }
}

// Create root with error handling and performance optimization
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Remove initial loading indicator
const loader = document.getElementById('initial-loader');
if (loader) {
  loader.remove();
}

// Use concurrent features for better performance
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Preload critical routes for instant navigation
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Preload critical components when browser is idle
    import('@/pages/Tool.tsx');
    import('@/pages/Category.tsx');
  });
}
