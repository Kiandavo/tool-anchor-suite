
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'

// Error boundary for the entire app
class GlobalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Global error boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Global error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              خطایی در بارگذاری صفحه رخ داده است
            </h2>
            <p className="text-gray-600 mb-4">
              لطفاً صفحه را رفرش کنید یا دوباره تلاش کنید.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              رفرش صفحه
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create root with error handling
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

// Improved loading screen removal with proper React detection
const removeLoadingScreen = () => {
  console.log('Attempting to remove loading screen...');
  const loadingScreen = document.querySelector('.initial-loading');
  if (loadingScreen) {
    console.log('Loading screen found, removing...');
    loadingScreen.classList.add('opacity-0');
    setTimeout(() => {
      loadingScreen?.remove();
      console.log('Loading screen removed successfully');
    }, 300);
  } else {
    console.log('Loading screen not found');
  }
};

// Wait for React to actually render before removing loading screen
const waitForReactRender = () => {
  return new Promise<void>((resolve) => {
    const checkForContent = () => {
      const appContent = document.querySelector('[data-react-app]') || 
                        document.querySelector('#root > *');
      
      if (appContent) {
        console.log('React content detected, app is ready');
        resolve();
      } else {
        console.log('Waiting for React content...');
        setTimeout(checkForContent, 50);
      }
    };
    
    // Start checking after a minimal delay
    setTimeout(checkForContent, 100);
  });
};

// Render with comprehensive error handling and proper loading detection
try {
  root.render(
    <React.StrictMode>
      <GlobalErrorBoundary>
        <BrowserRouter>
          <div data-react-app>
            <App />
          </div>
        </BrowserRouter>
      </GlobalErrorBoundary>
    </React.StrictMode>
  );

  // Remove loading screen only after React has rendered
  waitForReactRender().then(() => {
    setTimeout(removeLoadingScreen, 500); // Small additional delay for smooth transition
  }).catch((error) => {
    console.error('Error waiting for React render:', error);
    // Fallback: remove loading screen after timeout
    setTimeout(removeLoadingScreen, 2000);
  });

} catch (error) {
  console.error('Failed to render React app:', error);
  // Remove loading screen even if there's an error
  setTimeout(removeLoadingScreen, 1000);
}

// Performance monitoring for development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        console.log('Page Load Time:', entry.duration);
      }
    }
  });
  
  try {
    observer.observe({ entryTypes: ['navigation'] });
  } catch (e) {
    console.warn('Performance observer not supported');
  }
}
