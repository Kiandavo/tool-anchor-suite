
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

// Improved loading screen removal
const removeLoadingScreen = () => {
  console.log('Removing loading screen...');
  const loadingScreen = document.querySelector('.initial-loading');
  if (loadingScreen) {
    loadingScreen.classList.add('opacity-0');
    setTimeout(() => {
      loadingScreen?.remove();
      console.log('Loading screen removed successfully');
    }, 300);
  }
};

// Wait for homepage content to be ready
const waitForHomepageContent = () => {
  return new Promise<void>((resolve) => {
    const checkForContent = () => {
      // Look for specific homepage content
      const heroSection = document.querySelector('section');
      const appContent = document.querySelector('[data-react-app]');
      
      if (heroSection && appContent) {
        console.log('Homepage content detected');
        resolve();
      } else {
        setTimeout(checkForContent, 100);
      }
    };
    
    setTimeout(checkForContent, 200);
  });
};

// Render with improved loading detection
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

  // Remove loading screen after homepage content is ready
  waitForHomepageContent()
    .then(() => {
      setTimeout(removeLoadingScreen, 500);
    })
    .catch(() => {
      // Fallback: remove after timeout
      setTimeout(removeLoadingScreen, 3000);
    });

} catch (error) {
  console.error('Failed to render React app:', error);
  setTimeout(removeLoadingScreen, 1000);
}
